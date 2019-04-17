<script>
import { emitErrorMixin, handleOptionsMixin } from '../core/tools'

import serviceHeaderVue from '../core/serviceHeader.vue'

import settingBooleanVue from '../core/input/settingBoolean.vue'
import settingIntVue from '../core/input/settingInt.vue'
import settingStringVue from './input/settingString.vue'

export default {
  mixins: [ emitErrorMixin, handleOptionsMixin ],
  components: {
    serviceHeader: serviceHeaderVue,
    settingBoolean: settingBooleanVue,
    settingInt: settingIntVue,
    settingString: settingStringVue
  },
  methods:{
    passMove(move) {
      this.$emit('move', move)
    }
  }
}
</script>
