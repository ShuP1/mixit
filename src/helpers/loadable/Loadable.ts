

export default class Loadable<T> {

  protected loaded = false
  protected data?: T

  constructor() {
    this.reset()
  }

  reset() {
    this.loaded = false
    this.data = undefined
  }

  get() {
    return this.data
  }

  with(call: (data: T) => void) {
    if (this.data) {
      call(this.data)
    }
  }

  map<U>(mapper: (data: T) => U, or: U) {
    return this.data ? mapper(this.data) : or
  }

  get display() {
    return this.loaded ? (this.data ? this.data.toString() : 'Empty') : 'Loading...'
  }

  success(data: T) {
    this.loaded = true
    this.data = data
  }

}