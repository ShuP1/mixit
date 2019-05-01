import { AxiosPromise, AxiosResponse } from 'axios'
import { Component } from 'vue-property-decorator'

import AxiosLoadable from '@/helpers/loadable/AxiosLoadable'
import { unsafeAxiosMapper } from '@/helpers/unsafeAxiosMapper'
import { Auth } from '@/types/App'
import ConnectedService from './ConnectedService'

@Component
export default class AccountService<T, E, U = T> extends ConnectedService<T, E> {

  account = new AxiosLoadable<T, E>()

  get connector() {
    return this.account
  }

  load() {
    this.account.load(this.catchEmit(this.getAccount(this.auth)), this.mapAccount)
  }
  mapAccount(res: AxiosResponse<U>) {
    return unsafeAxiosMapper<T, U>(res)
  }

  checkAuth(auth: Auth) {
    return this.getAccount(auth)
  }

  mapServiceName(res: AxiosResponse<U>, newAuth: Auth) {
    return `${this.serviceName} ${this.mapAccount(res)}`
  }

  getAccount(auth: Auth): AxiosPromise<U> {
    throw this.mustBeDefined;
  }

}
