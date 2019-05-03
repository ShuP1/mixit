import { AxiosPromise, AxiosResponse } from 'axios'
import { Component } from 'vue-property-decorator'

import ErrorLoadable from '@/helpers/loadable/ErrorLoadable'
import { Auth } from '@/types/App'
import BaseService from './BaseService'

@Component
export default class ConnectedService<T, E> extends BaseService {

  get isSetup(): boolean {
    throw this.mustBeDefined
  }
  get connector(): ErrorLoadable<T, E | string> {
    throw this.mustBeDefined
  }
  get serviceName(): string {
    throw this.mustBeDefined
  }

  newAuth = {}

  init() {
    if (this.isSetup) {
      this.load()
    } else {
      this.connector.fail('First connection')
    }
  }

  makeAuth() {
    const auth = new Auth(Object.entries(this.newAuth))
    this.catchEmit(this.checkAuth(auth)).then(res =>
      this.saveService({ name: this.mapServiceName(res, auth), auth }))
  }

  mapServiceName(res: AxiosResponse, newAuth: Auth) {
    return this.serviceName
  }

  load(): void {
    throw this.mustBeDefined
  }
  checkAuth(auth: Auth): AxiosPromise {
    throw this.mustBeDefined
  }
}
