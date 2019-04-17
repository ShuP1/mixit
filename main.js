//TODO: discord

const servicesStorage = 'services'
var app = new Vue({
  el: '#app',
  data: {
    showManager: false,
    newService: '',
    services: [],
    errors: [],
    bus: new Vue()
  },
  mounted() {
    if (localStorage.getItem(servicesStorage)) { //TODO: allow external storage
      try {
        this.services = JSON.parse(localStorage.getItem(servicesStorage))
      } catch (e) {
        localStorage.removeItem(servicesStorage)
      }
    }

    this.bus.$on('error', this.onError)
    this.bus.$on('saveAll', this.onSaveAll)
    this.bus.$on('save', this.onSave)
    this.bus.$on('move', this.onMove)
  },
  methods: {
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
    //Services
    addService() {
      if (!this.newService)
        return

      this.services.push({
        type: this.newService,
        options: {}, position: {}
      })
      this.newService = ''
      this.showManager = false
      this.saveServices()
    },
    onSave({ key, msg }) {
      this.$set(this.services[key].options, msg.key, msg.value)
      this.saveServices()
    },
    onSaveAll({ key, msg }) {
      this.$set(this.services, key, {
        ...this.services[key],
        options: msg
      })
      this.saveServices()
    },
    onMove({ key, msg }) {
      this.$set(this.services[key].position, msg.type, Math.max(1,
        (this.services[key].position[msg.type] || 1) + msg.direction
      ))
      this.saveServices()
    },
    removeService(id) {
      this.services.splice(id, 1)
      this.saveServices()
    },
    saveServices() {
      localStorage.setItem(servicesStorage, JSON.stringify(this.services))
      this.$forceUpdate()
    },
    gridPos(id, position = {}) {
      return {
        "grid-row": `${position.x || 1} / span ${position.h || 2}`,
        "grid-column": `${position.y || id*2+1} / span ${position.w || 2}`
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