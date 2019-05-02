import { Component, Prop, Vue } from 'vue-property-decorator'

import ErrorLoadable from '@/helpers/loadable/ErrorLoadable'

@Component
export default class Loadable<T, E> extends Vue {

  @Prop()
  readonly loadable!: ErrorLoadable<T, E>

  get get() {
    return this.loadable.get()
  }
}