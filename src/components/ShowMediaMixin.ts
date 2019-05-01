import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ShowMediaMixin extends Vue {

  @Prop({ type: Boolean, default: true })
  readonly showMedia!: boolean

}