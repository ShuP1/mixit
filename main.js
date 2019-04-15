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
                options: {}
            })
            this.newService = ''
            this.showManager = false
            this.saveServices()
        },
        setService(id, options) {
            this.services.push({
                type: this.services[id].type,
                options: options
            })
            this.removeService(id)
        },
        removeService(id) {
            this.services.splice(id, 1)
            this.saveServices()
        },
        saveServices() {
            localStorage.setItem(servicesStorage, JSON.stringify(this.services))
        }
    }
})