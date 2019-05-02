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
    return promise.then(res => {
      if (this.data) {
        then(res, this.data)
      }
      this.loadingMore = false
    })
  }

  handleScroll<U>(target: ScrollTarget, promiser: (data: T) => AxiosPromise<U>, then: (res: AxiosResponse<U>, data: T) => void,
    reseter?: (data: T) => void, bottom: number = 100, top: number = 20) {
    if (this.data && this.loaded) {
      if (!this.isLoadingMore && target.scrollHeight - target.clientHeight - target.scrollTop - bottom < 0) {
        this.loadMore(promiser(this.data), then)
      } else if (reseter && target.scrollTop < top) {
        reseter(this.data)
      }
    }
  }
}

interface ScrollTarget {
  scrollHeight: number
  clientHeight: number
  scrollTop: number
}