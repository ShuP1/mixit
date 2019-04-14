//TODO: discord, weather graph

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
        if (sessionStorage.getItem(servicesStorage)) {
            try {
                this.services = JSON.parse(sessionStorage.getItem(servicesStorage))
            } catch (e) {
                sessionStorage.removeItem(servicesStorage)
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
                options: {}
            })
            this.newService = ''
            this.showManager = false
            this.saveServices()
        },
        setService(id, options) {
            this.$set(this.services, id, {
                type: this.services[id].type,
                options: options
            })
            this.saveServices()
        },
        removeService(id) {
            this.services.splice(id, 1)
            this.saveServices()
        },
        saveServices() {
            sessionStorage.setItem(servicesStorage, JSON.stringify(this.services))
        }
    }
})