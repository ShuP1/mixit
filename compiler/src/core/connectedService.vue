<script>
import baseServiceVue from './baseService.vue'
import Loadable from './loadable/Loadable'

export default {
  extends: baseServiceVue,
  computed: {
    isSetup() {
      this.mustDefine('isSetup computed')
      return false
    },
    connector() {
      this.mustDefine('connector computed')
      return new Loadable()
    },
    serviceName() {
      this.mustDefine('serviceName computed')
      return undefined
    }
  },
  methods: {
    init() {
      if(this.isSetup) {
        this.load()
      } else this.connector.fail('First connection')
    },
    makeAuth() {
      this.catchEmit(this.checkAuth(this.newAuth)).then(res =>
        this.saveService(this.mapServiceName(res, this.newAuth), this.newAuth))
    },
    load() {
      this.mustDefine('load() method')
    },
    checkAuth() {
      this.mustDefine('checkAuth(auth) method')
    },
    mapServiceName() {
      return this.serviceName
    },
  }
}
</script>
