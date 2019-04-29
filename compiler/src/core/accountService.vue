<script>
import Loadable from './loadable/Loadable.js'
import connectedServiceVue from './connectedService.vue'

export default {
  extends: connectedServiceVue,
  data() {
    return {
      account: new Loadable()
    }
  },
  computed: {
    connector() {
      return this.account
    }
  },
  methods: {
    load() {
      this.account.load(this.catchEmit(this.getAccount(this.auth)), this.mapAccount)
    },
    checkAuth(auth) {
      return this.getAccount(auth)
    },
    getAccount() {
      this.mustDefine('getAccount(auth) method')
    },
    mapAccount(res) {
      return res.data
    },
    mapServiceName(res) {
      return `${this.serviceName} ${this.mapAccount(res)}`
    }
  }
}
</script>
