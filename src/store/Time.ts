import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

export interface TimeState {
  now: Date
}

@Module({ name: 'time', namespaced: true })
export default class Time extends VuexModule implements TimeState {
  now = new Date

  @Mutation
  updateTime() {
    this.now = new Date
  }

  @Action
  start() {
    setInterval(() => {
      this.updateTime()
    }, 15 * 1000)
  }

}