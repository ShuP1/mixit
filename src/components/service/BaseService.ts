import { Component, Prop, Watch } from 'vue-property-decorator'

import { Auth } from '@/types/App'
import SettingBooleanVue from '../input/SettingBoolean.vue'
import SettingIntVue from '../input/SettingInt.vue'
import SettingStringVue from '../input/SettingString.vue'
import ServiceEmiter from '../ServiceEmiter'

@Component({
  components: {
    'setting-string': SettingStringVue,
    'setting-int': SettingIntVue,
    'setting-boolean': SettingBooleanVue
  }
})
export default class BaseService extends ServiceEmiter {

  @Prop({
    type: Map,
    default() {
      return new Auth()
    }
  })
  readonly auth!: Auth

  @Prop({ type: Object, default: {} })
  readonly options!: object

  @Watch('auth')
  onAuthChanged() {
    this.init()
  }

  get mustBeDefined() {
    return new Error('Must be defined')
  }

  created() {
    this.init()
  }

  init(): void {
    throw this.mustBeDefined
  }

}