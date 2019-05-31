import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

export interface IEmit {
  $emit: (name: string, arg: any) => void
}

@Component
export default class LocalBusMixin<O, B extends O & IEmit> extends Vue {

  @Prop(Object)
  readonly bus!: B

}