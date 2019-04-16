//TODO: discord

const servicesStorage = 'services'
var app = new Vue({
    el: '#app',
    data: {
        showManager: false,
        newService: '',
        services: [],
        errors: []
    },
    mounted() {
        if (localStorage.getItem(servicesStorage)) {
            try {
                this.services = JSON.parse(localStorage.getItem(servicesStorage))
            } catch (e) {
                localStorage.removeItem(servicesStorage)
            }
        }
    },
    methods: {
        addError(err) {
            this.errors.push(err)
        },
        removeError(id) {
            this.errors.splice(id, 1)
        },
        addService() {
            // ensure they actually typed something
            if (!this.newService) {
                return;
            }

            this.services.push({
                type: this.newService,
                options: {}, position: {}
            })
            this.newService = ''
            this.showManager = false
            this.saveServices()
        },
        setService(id, options) {
            this.$set(this.services, id, {
                ...this.services[id],
                options: options
            })
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
        }
    }
})