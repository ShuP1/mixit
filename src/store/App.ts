import { Selectable } from '@/helpers/lists/Selectable'
import ErrorLoadable from '@/helpers/loadable/ErrorLoadable'
import { Layout, Service } from '@/types/App'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

export interface AppState {
  layouts: ErrorLoadable<Selectable<Layout>, string>
  services: ErrorLoadable<Service[], string>
  errors: string[]
}

@Module({ name: 'app', namespaced: true })
export default class App extends VuexModule implements AppState {
  layouts = new ErrorLoadable<Selectable<Layout>, string>()
  services = new ErrorLoadable<Service[], string>()
  errors: string[] = []

  addError(error: string) {
    this.errors.push(error)
  }
  removeError(id: number) {
    this.errors.splice(id, 1)
  }

}