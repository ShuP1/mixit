import { AxiosPromise, AxiosResponse } from 'axios'
import { unsafeAxiosMapper } from '../unsafeAxiosMapper'
import ErrorLoadable from './ErrorLoadable'

export default class AxiosLoadable<T, E> extends ErrorLoadable<T, E> {

  load<U>(promise: AxiosPromise<U>, then: (res: AxiosResponse<U>) => T = res => unsafeAxiosMapper<T, U>(res), reset = true) {
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