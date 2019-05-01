import { Component, Prop } from 'vue-property-decorator'

import { Auth } from '@/types/App'
import ServiceEmiter from './ServiceEmiter'

@Component
export default class ServiceClient<O> extends ServiceEmiter {

  @Prop(Map)
  readonly auth!: Auth

  @Prop(Object)
  readonly options!: O

}