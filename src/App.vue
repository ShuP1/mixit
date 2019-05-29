<template lang="pug">
#app
  #errors(v-show="errors")
    .error(v-for="(error, key) in errors" @click="removeError(key)") {{ error }}

  #content
    #services
      .tile(v-if="tiles" v-for="tile in tiles" :style="tile.grid")
        component(:is="tile.service.type" :emit="tile.emiter" :auth="tile.service.auth" :options="tile.options")

    button#showManager(@click="toggleManager") {{ managerButton }}
    #manager(v-show="showManager")
      .newService
        //TODO: change to select
        input(v-model="newService" @keyup.enter="addService" placeholder="service")
      #layout-select
        .layout(v-for="(layout, id) in layouts.get().data")
          template(v-if="layouts.get().selectedId == id")
            input(:value="layout.name" @keyup.ctrl.delete="removeSelectedLayout()"
              @keyup.enter="renameSelectedLayout($event.target.value)")
          button(v-else @click="selectLayout(id)") {{ layout.name }}
        .layout
          button(@click="addLayout") +
      .showService
        select(@change="showService($event.target.value)")
          option(selected disabled) ---
          option(v-for="(service, key) in services.get()" :value="key")
            | {{ service.name || service.type }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Selectable } from './helpers/lists/Selectable'
import LocalStorageHandler from './helpers/storage/LocalStorageHandler'
import Discord from './services/discord/Discord.vue'
import Mastodon from './services/mastodon/Mastodon.vue'
import NextcloudNews from './services/nextcloud/NextcloudNews.vue'
import OpenWeatherMap from './services/openweathermap/OpenWeatherMap.vue'
import { Auth, Layout, Rect, Service, serviceKey, tileKey } from './types/App'
import * as Events from './types/Events'

const layoutsStorage = 'layouts'
const servicesStorage = 'services'

function saveAuth(auth: Auth) {
  const res: any = {}
  for (const entry of auth.entries()) {
    res[entry[0]] = entry[1]
  }
  return res
}

@Component({ components: { Mastodon, NextcloudNews, openweathermap: OpenWeatherMap, Discord } })
export default class App extends Vue {
  showManager = false

  layouts = new LocalStorageHandler(layoutsStorage,
    new Selectable<Layout>([{ name: 'main', tiles: [] }]),
    data => new Selectable<Layout>(data), l => l.data)

  services = new LocalStorageHandler<Service[]>(servicesStorage, [],
    (data: any[]) => data.map(s => ({ ...s, auth: new Auth(Object.entries(s.auth)) })),
    data => data.map(s => ({ ...s, auth: saveAuth(s.auth) })))
  newService = ''

  errors: string[] = []
  bus = new Vue()

  get managerButton() {
    return this.showManager ? '▼' : '▲'
  }

  get tiles() {
    const layout = this.layouts.get().selected
    if(layout) {
      return layout.tiles.map((tile, key: tileKey) => {
        const service = this.loadService(key, tile.service)
        if(service) {
          return {
            ...tile, service, serviceId: tile.service,
            grid: this.gridPos(tile.position), emiter: this.makeEmiter(key)
          }
        }
      })
    } else {
      return []
    }
  }

  mounted() {
    this.layouts.load()
    this.services.load()

    new Map<string, (event: Events.Message) => void>([
      [ Events.ErrorEvent, this.onError ],
      [ Events.SaveOptionsEvent, this.onSaveOptions ],
      [ Events.SaveOptionEvent, this.onSaveOption ],
      [ Events.MoveTileEvent, this.onMoveTile ],
      [ Events.RemoveTileEvent, this.onRemoveTile ],
      [ Events.SaveServiceEvent, this.onSaveService ],
      [ Events.RemoveServiceEvent, this.onRemoveService ]
    ]).forEach((handler, name) => this.bus.$on(name, handler))
  }

  // UI
  toggleManager() {
    this.showManager = !this.showManager
  }
  selectLayout(id: number) {
    this.layouts.get().select(id)
  }

  // Layouts
  addLayout() {
    this.layouts.edit(l => {
      l.data.push({ name: 'layout' + l.data.length, tiles: [] })
      return l
    })
  }
  renameSelectedLayout(name: string) {
    this.layouts.edit(data => {
      if(data.selected) {
        data.selected.name = name
      }
      return data
    })
  }
  removeSelectedLayout() {
    this.layouts.edit(data => data.remove())
  }

  // Tiles
  showService(id: serviceKey) {
    this.layouts.edit(data => {
      if(data.selected) {
        data.selected.tiles.push({
          service: id, position: {}, options: {}
        })
      }
      return data
    })
  }
  onSaveOption({ key, msg }: Events.SaveOptionMessage) {
    this.layouts.edit(data => {
      if(data.selected) {
        this.$set(data.selected.tiles[key].options, msg.key, msg.value)
      }
      return data
    })
  }
  onSaveOptions({ key, msg }: Events.SaveOptionsMessage) {
    this.layouts.edit(data => {
      if(data.selected) {
        let options = data.selected.tiles[key].options
        options = Object.assign({}, options, msg)
      }
      return data
    })
  }
  onMoveTile({ key, msg }: Events.MoveTileMessage) {
    this.layouts.edit(data => {
      if(data.selected){
        const position = data.selected.tiles[key].position
        this.$set(position, msg.type, Math.max(1,
          (position[msg.type] || 1) + msg.direction
        ))
      }
      return data
    })
  }
  onRemoveTile({ key }: Events.RemoveTileMessage) {
    this.layouts.edit(data => {
      if(data.selected) {
        data.selected.tiles.splice(key, 1)
      }
      return data
    })
  }

  // Services
  getServiceId(key: number) {
    const tile = this.tiles[key]
    if(tile) {
      return tile.serviceId
    } else {
      throw new Error('tile not found')
    }
  }
  addService() {
    if (this.newService) {
      this.services.edit(data => {
        data.push({ type: this.newService, name: this.newService, auth: new Auth() })
        return data
      })
      this.showService(this.services.get().length - 1)
      this.newService = ''
    }
  }
  onSaveService({ key, msg }: Events.SaveServiceMessage) {
    const service = this.loadService(key, this.getServiceId(key))
    if(service){
      service.name = msg.name
      service.auth = msg.auth
      this.services.save()
    }
  }
  onRemoveService({ key }: Events.RemoveServiceMessage) {
    this.services.edit(data => {
      data.splice(this.getServiceId(key), 1)
      return data
    })
    this.onRemoveTile({ key, msg: undefined })
  }

  // Errors
  onError({ msg }: Events.ErrorMessage) {
      this.errors.push(msg.toString())
  }
  removeError(id: number) {
    this.errors.splice(id, 1)
  }

  // Helpers
  private gridPos(position: Rect) {
    return {
      'grid-row': `${position.x || 1} / span ${position.h || 2}`,
      'grid-column': `${position.y || 1} / span ${position.w || 2}`
    }
  }
  private makeEmiter(key: tileKey) {
    const bus = this.bus
    return (name: string, msg: any) => {
      bus.$emit(name, { key, msg })
    }
  }
  private loadService(key: tileKey, id: serviceKey) {
    const ser = this.services.get()[id]
    if (ser){
      return ser
    } else {
      this.onRemoveTile({ key, msg: undefined })
      this.errors.push('Removing missing service')
    }
  }

}
</script>

<style lang="sass">
@import 'common.sass'

*
  margin: 0
  padding: 0
  font-family: Verdana, Geneva, sans-serif
  scrollbar-width: thin

body
  background-color: $backColor
  color: $foreColor

a, .osef
  text-decoration: none
  color: $noneColor

input, select, button, textarea
  background-color: $backColor
  color: $foreColor
  border: 1px solid $halfColor

.icon
  width: 1em
  height: 1em
  vertical-align: middle

.text-icon
  font-weight: bold
  font-size: 1.2em

.note
  font-size: .7em
  vertical-align: text-top

.letter
  margin: 0 .5em

.colored
  color: orange

.danger
  color: #fdd

#errors
  position: absolute
  .error
    @include main-tile

#content
  display: flex
  flex-direction: column
  height: 100vh

#showManager
  position: absolute
  bottom: 0

#manager
  background-color: $tileColor
  @include rounded
  padding-left: 1em
  height: 1.3em
  display: flex
  justify-content: space-between

#layout-select
  display: flex

#services
  flex: 1
  overflow: hidden
  display: grid
  grid-gap: .2em
  grid-template-columns: repeat(8, minmax(0, 1fr))
  grid-template-rows: repeat(4, minmax(0, 1fr))
  justify-items: stretch
  .tile
    overflow: auto
    & > div
      height: 100%
      display: flex
      flex-direction: column
      .service-header
        .title, .settings
          @include main-tile
        .title
          font-size: large
          text-align: center
          font-weight: bold
        .settings .position
          float: right
          width: 1.2em
      .service-content
        flex-grow: 1
        overflow: hidden
  .service-loader
    display: inline-block
    width: 64px
    height: 64px
    &:after
      content: " "
      display: block
      width: 46px
      height: 46px
      margin: 1px
      border-radius: 50%
      border: 5px solid $noneColor
      border-color: $noneColor transparent $noneColor transparent
      animation: service-loader 1.2s linear infinite
    @keyframes service-loader
      0%
        transform: rotate(0deg)
      100%
        transform: rotate(360deg)
</style>