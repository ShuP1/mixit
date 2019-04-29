/* globals Vue */
/* exported app */

const layoutsStorage = 'layouts'
const servicesStorage = 'services'

class WebStorageHandler { //TODO: extends loadable
  constructor(storage, key, data) {
    this.storage = storage
    this.key = key
    this.data = data || []
  }

  get() {
    return this.data
  }

  load() {
    if (this.storage.getItem(this.key)) {
      try {
        this.data = JSON.parse(this.storage.getItem(this.key))
      } catch (e) {
        this.storage.removeItem(this.key)
      }
    }
  }

  save() {
    this.storage.setItem(this.key, JSON.stringify(this.data))
  }
}

var app = new Vue({
  el: '#app',
  data: {
    showManager: false,

    layouts: new WebStorageHandler(window.localStorage, layoutsStorage, [{ name: 'main', tiles: [] }]),
    layoutId: 0,

    services: new WebStorageHandler(window.localStorage, servicesStorage),
    newService: '',

    errors: [],
    bus: new Vue()
  },
  mounted() {
    this.layouts.load()
    this.services.load()

    this.bus.$on('error', this.onError)
    this.bus.$on('saveOptions', this.onSaveOptions)
    this.bus.$on('saveOption', this.onSaveOption)
    this.bus.$on('move', this.onMove)
    this.bus.$on('remove', this.onRemove)
    this.bus.$on('saveService', this.onSaveService)
    this.bus.$on('removeService', this.onRemoveService)
  },
  computed: {
    layout() {
      return this.layouts.get()[this.layoutId]
    },
    layoutTiles() {
      return this.layout.tiles.map((tile, key) => ({
        ...tile, service: this.loadService(key, tile.service),
        grid: this.gridPos(tile.position), emiter: this.makeEmiter(key)
      }))
    }
  },
  methods: {
    //Layouts
    addLayout() {
      this.layouts.get().push({
        name: 'layout' + this.layouts.get().length, tiles: []
      })
      this.layouts.save()
    },
    renameSelectedLayout(name) {
      this.layout.name = name
      this.layouts.save()
    },
    removeSelectedLayout() {
      this.layouts.get().splice(this.layoutId, 1)
      this.layoutId = 0
      this.layouts.save()
    },
    //Tiles
    showService(id) {
      this.layout.tiles.push({
        service: id, position: {}, options: {}
      })
      this.layouts.save()
    },
    tile(id) {
      return this.layout.tiles[id]
    },
    onSaveOption({ key, msg }) {
      this.$set(this.tile(key).options, msg.key, msg.value)
      this.layouts.save()
    },
    onSaveOptions({ key, msg }) {
      this.tile(key).options = Object.assign({}, this.tile(key).options, msg)
      this.layouts.save()
    },
    onMove({ key, msg }) {
      this.$set(this.tile(key).position, msg.type, Math.max(1,
        (this.tile(key).position[msg.type] || 1) + msg.direction
      ))
      this.layouts.save()
    },
    onRemove({ key }) {
      this.layout.tiles.splice(key, 1)
      this.layouts.save()
    },

    //Services
    loadService(key, id) {
      const ser = this.services.get()[id]
      if (ser)
        return ser
      else {
        this.onRemove({ key })
        this.addError('Removing missing service')
      }
    },
    addService() {
      if (this.newService) {
        this.services.get().push({ type: this.newService, name: this.newService, auth: {} })
        this.services.save()
        this.showService(this.services.get().length - 1)
        this.newService = ''
      }
    },
    onSaveService({ key, msg }) {
      const service = this.loadService(key, this.tile(key).service)
      service.name = msg.name
      service.auth = msg.auth
      this.services.save()
    },
    onRemoveService({ key }) {
      this.services.get().splice(this.tile(key).service, 1)
      this.onRemove({ key })
      this.services.save()
    },

    //Errors
    onError(event) {
      this.addError(event.msg.toString())
    },
    addError(err) {
      this.errors.push(err)
    },
    removeError(id) {
      this.errors.splice(id, 1)
    },

    //Helpers
    gridPos(position = {}) {
      return {
        'grid-row': `${position.x || 1} / span ${position.h || 2}`,
        'grid-column': `${position.y || 1} / span ${position.w || 2}`
      }
    },
    makeEmiter(key) {
      const self = this
      return function(name, msg) {
        self.bus.$emit(name, { msg: msg, key: key })
      }
    }
  }
})