export default class {
  constructor() {
    this.reset()
  }

  get() {
    return this.data
  }
  isSuccess() {
    return this.loaded && this.error == undefined
  }
  display() {
    return this.loaded ? (this.error || this.data) : 'Loading...'
  }

  reset() {
    this.loaded = false
    this.data = undefined
    this.error = undefined
  }
  success(data) {
    this.loaded = true
    this.data = data || {}
  }
  fail(error) {
    this.loaded = true
    this.error = error || 'Failed'
  }

  load(promise, then, reset = true) {
    if(reset)
      this.reset()

    promise
      .then(res => this.success(then(res)))
      .catch(err => {
        this.fail(err)
        throw err
      })
  }
}