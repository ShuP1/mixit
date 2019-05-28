import { AxiosPromise } from 'axios'
import { Component, Prop, Vue } from 'vue-property-decorator'

import LoadableBlock from './loadable/LoadableBlock.vue'
import LoadableInline from './loadable/LoadableInline.vue'
import SuccessLoadable from './loadable/SuccessLoadableBlock.vue'

import { ServiceData } from '@/types/App'
import * as Events from '@/types/Events'

@Component({ components: { LoadableBlock, LoadableInline, SuccessLoadable } })
export default class ServiceEmiter extends Vue {
  @Prop(Function)
  readonly emit!: (name: string, msg: any) => void

  emitError(err: string) {
    this.emit(Events.ErrorEvent, err)
  }

  saveOptions(options: object) {
    this.emit(Events.SaveOptionsEvent, options)
  }

  saveOption(key: string, value: any) {
    this.saveOptionCouple({ key, value })
  }

  saveOptionCouple(couple: Events.Option) {
    this.emit(Events.SaveOptionEvent, couple)
  }

  saveService(service: ServiceData) {
    this.emit(Events.SaveServiceEvent, service)
  }

  catchEmit<T>(req: AxiosPromise<T>) {
    return req.catch(err => {
      this.emitError(err)
      throw err
    })
  }
}
