import { AxiosPromise } from 'axios'
import { Component, Prop, Vue } from 'vue-property-decorator'

import LoadableBlock from './loadable/LoadableBlock.vue'
import LoadableInline from './loadable/LoadableInline.vue'
import SuccessLoadable from './loadable/SuccessLoadableBlock.vue'

import { ErrorsModule, LayoutsModule, ServicesModule } from '@/store'
import { Options, ServiceData } from '@/types/App'

@Component({ components: { LoadableBlock, LoadableInline, SuccessLoadable } })
export default class ServiceEmiter extends Vue {
  @Prop(Number)
  readonly tileKey!: number

  addError(error: any) {
    ErrorsModule.add(error.toString())
  }

  saveOptions(options: Options) {
    LayoutsModule.setTileOptions(this.tileKey, options)
  }

  saveOption(key: string, value: any) {
    LayoutsModule.setTileOption(this.tileKey, key, value)
  }

  saveOptionCouple({ key, value }: { key: string, value: any }) {
    this.saveOption(key, value)
  }

  saveService({ name, auth }: ServiceData) {
    ServicesModule.set(LayoutsModule.getTile(this.tileKey).service, name, auth)
  }

  catchError(req: AxiosPromise) {
    return req.catch(err => {
      this.addError(err)
      throw err
    })
  }
}
