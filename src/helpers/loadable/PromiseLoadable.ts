import { unsafeMapper } from '../unsafeMapper'
import ErrorLoadable from './ErrorLoadable'

export default class PromiseLoadable<T, E> extends ErrorLoadable<T, E> {

  load<U>(promise: Promise<U>, then: (res: U) => T = res => unsafeMapper<T, U>(res), reset = true) {
    if (reset) {
      this.reset()
    }

    return promise
      .then(res => this.success(then(res)))
      .catch(err => {
        this.fail(err)
        throw err
      })
  }

}