import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BaseSetting extends Vue {

  @Prop(String)
  readonly id!: string

  @Prop(String)
  readonly title!: string

  @Emit('change')
  sendChange(value: any) {
    return { key: this.id, value }
  }

}
