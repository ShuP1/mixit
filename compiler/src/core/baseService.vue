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
  extends: serviceEmiterVue,
  components: {
    loadableBlock: loadableBlockVue,
    loadableInline: loadableInlineVue,

    serviceHeader: serviceHeaderVue,

    settingBoolean: settingBooleanVue,
    settingInt: settingIntVue,
    settingString: settingStringVue
  }
}

export const Loadable = _Loadable
</script>
