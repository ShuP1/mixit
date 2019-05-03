import Vue from 'vue'
import Vuex from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Time from './Time'

Vue.use(Vuex)

export interface State {
  time: Time
}

const store = new Vuex.Store<State>({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    time: Time
  }
})

export const TimeModule = getModule(Time, store)
TimeModule.start()

export default store