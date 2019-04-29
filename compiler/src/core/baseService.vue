<script>
import serviceEmiterVue from './serviceEmiter.vue'

import _Loadable from './loadable/Loadable.js'
import loadableBlockVue from './loadable/loadableBlock.vue'
import loadableInlineVue from './loadable/loadableInline.vue'

import serviceHeaderVue from './serviceHeader.vue'

import settingBooleanVue from './input/settingBoolean.vue'
import settingIntVue from './input/settingInt.vue'
import settingStringVue from './input/settingString.vue'

export default {
  components: {
    loadableBlock: loadableBlockVue,
    loadableInline: loadableInlineVue,

    serviceHeader: serviceHeaderVue,

    settingBoolean: settingBooleanVue,
    settingInt: settingIntVue,
    settingString: settingStringVue
  },
  extends: serviceEmiterVue,
  props: {
    auth: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      newAuth: {}
    }
  },
  watch: {
    auth() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.mustDefine('init() method')
    },
    mustDefine(name) {
      this.emitError('Must define ' + name)
    }
  }
}

export const Loadable = _Loadable
</script>
