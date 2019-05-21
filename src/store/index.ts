import Vue from 'vue'
import Vuex from 'vuex'
import { getModule } from 'vuex-module-decorators'

import Errors from './Errors'
import Layouts from './Layouts'
import Services from './Services'
import Time from './Time'

Vue.use(Vuex)

export interface State {
  errors: Errors
  layouts: Layouts
  services: Services
  time: Time
}

const store = new Vuex.Store<State>({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    errors: Errors,
    layouts: Layouts,
    services: Services,
    time: Time
  }
})

export const ErrorsModule = getModule(Errors, store)

export const LayoutsModule = getModule(Layouts, store)
LayoutsModule.load()

export const ServicesModule = getModule(Services, store)
ServicesModule.load()

export const TimeModule = getModule(Time, store)
TimeModule.start()

export default store