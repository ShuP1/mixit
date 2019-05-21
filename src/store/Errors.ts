import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

export interface ErrorsState {
    errors: string[]
}

@Module({ name: 'errors', namespaced: true })
export default class Errors extends VuexModule implements ErrorsState {
    errors: string[] = []

    @Mutation
    add(error: string) {
        this.errors.push(error)
    }

    @Mutation
    remove(id: number) {
        this.errors.splice(id, 1)
    }

}