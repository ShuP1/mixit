<script>
import serviceEmiterVue from './serviceEmiter.vue'

import serviceHeaderVue from '../core/serviceHeader.vue'
import settingBooleanVue from '../core/input/settingBoolean.vue'
import settingIntVue from '../core/input/settingInt.vue'
import settingStringVue from './input/settingString.vue'

export default {
  extends: serviceEmiterVue,
  components: {
    serviceHeader: serviceHeaderVue,
    settingBoolean: settingBooleanVue,
    settingInt: settingIntVue,
    settingString: settingStringVue
  }
}
</script>
