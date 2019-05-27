import { Component, Prop, Watch } from 'vue-property-decorator'

import { Auth } from '@/types/App'
import SettingBoolean from '../input/SettingBoolean.vue'
import SettingInt from '../input/SettingInt.vue'
import SettingSelect from '../input/SettingSelect.vue'
import SettingString from '../input/SettingString.vue'
import ServiceEmiter from '../ServiceEmiter'
import ServiceHeader from '../ServiceHeader.vue'

@Component({ components: { ServiceHeader, SettingString, SettingInt, SettingBoolean, SettingSelect } })
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