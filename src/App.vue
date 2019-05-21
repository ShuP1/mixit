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
import Discord from './services/discord/Discord.vue'
import Mastodon from './services/mastodon/Mastodon.vue'
import NextcloudNews from './services/nextcloud/NextcloudNews.vue'
import OpenWeatherMap from './services/openweathermap/OpenWeatherMap.vue'
import { ErrorsModule, ServicesModule, LayoutsModule } from './store'
import { Auth, Layout, Rect, Service, serviceKey, tileKey } from './types/App'

@Component({ components: { Mastodon, NextcloudNews, openweathermap: OpenWeatherMap, Discord } })
export default class App extends Vue {
  showManager = false

  newService = ''

  get managerButton() {
    return this.showManager ? '▼' : '▲'
  }

  get tiles() {
    return LayoutsModule.tiles.map((tile, key: tileKey) => {
      const service = ServicesModule.get(tile.service)
      if(service) {
        return {
          ...tile, service, serviceId: tile.service,
          grid: this.gridPos(tile.position)
        }
      } else {
        LayoutsModule.removeTile(key)
      }
    })
  }

  // UI
  toggleManager() {
    this.showManager = !this.showManager
  }
  selectLayout(id: number) {
    LayoutsModule.select(id)
  }

  // Layouts
  addLayout() {
    LayoutsModule.add({ name: 'new layout', tiles: [] })
  }
  renameSelectedLayout(name: string) {
    LayoutsModule.setName(name)
  }
  removeSelectedLayout() {
    LayoutsModule.remove()
  }

  // Tiles
  showService(id: serviceKey) {
    LayoutsModule.addTile({
      service: id, position: {}, options: {}
    })
  }

  // Services
  addService() {
    if (this.newService) {
      const id = ServicesModule.add({
        type: this.newService, name: this.newService, auth: new Auth()
      })
      this.showService(id)
      this.newService = ''
    }
  }

  // Errors
  get errors() {
    return ErrorsModule.errors
  }
  removeError(id: number) {
    ErrorsModule.remove(id)
  }

  // Helpers
  private gridPos(position: Rect) {
    return {
      'grid-row': `${position.x || 1} / span ${position.h || 2}`,
      'grid-column': `${position.y || 1} / span ${position.w || 2}`
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

input, select, button
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