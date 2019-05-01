import { AxiosPromise } from 'axios'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { ServiceData } from '@/types/App'
import * as Events from '@/types/Events'

@Component({})
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

  catchEmit(req: AxiosPromise) {
    return req.catch(err => {
      this.emitError(err)
      throw err
    })
  }
}
