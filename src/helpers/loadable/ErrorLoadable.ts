import Loadable from './Loadable'

export default class ErrorLoadable<T, E> extends Loadable<T> {

  protected error?: E

  reset() {
    super.reset()
    this.error = undefined
  }

  get hasError() {
    return this.error !== undefined
  }

  get isSuccess() {
    return this.loaded && this.error === undefined
  }

  get display() {
    return this.loaded ? (this.error ? this.error.toString() : (this.data ? this.data.toString() : 'Empty')) : 'Loading...'
  }

  fail(error: E) {
    this.loaded = true
    this.error = error
  }

}