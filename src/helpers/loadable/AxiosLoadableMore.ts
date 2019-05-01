import { AxiosPromise, AxiosResponse } from 'axios'
import AxiosLoadable from './AxiosLoadable'

export default class AxiosLoadableMore<T, E> extends AxiosLoadable<T, E> {

  protected loadingMore = false

  get isLoadingMore() {
    return this.loadingMore
  }

  reset() {
    super.reset()
    this.loadingMore = false
  }

  loadMore<U>(promise: AxiosPromise<U>, then: (res: AxiosResponse<U>, data: T) => void) {
    this.loadingMore = true
    promise.then(res => {
      if (this.data) {
        then(res, this.data)
      }
      this.loadingMore = false
    })
  }
}