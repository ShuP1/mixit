import Loadable from './Loadable'

export default class extends Loadable {
  reset() {
    super.reset()
    this.loadingMore = false
  }

  loadMore(promise, then) {
    this.loadingMore = true
    promise.then(res => {
      then(res, this.data, this)
      this.loadingMore = false
    })
  }
}