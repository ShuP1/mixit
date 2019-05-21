import PromiseLoadable from '@/helpers/loadable/PromiseLoadable'
import StorageHandler from '@/helpers/storage/StorageHandler'
import { Auth, Service } from '@/types/App'
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

export interface ServicesState {
    services: PromiseLoadable<Service[], string>
}

@Module({ name: 'services', namespaced: true })
export default class Services extends VuexModule implements ServicesState {
    services = new PromiseLoadable<Service[], string>() // TODO: create increment id storage
    private storage = new StorageHandler<Service[]>(window.localStorage, 'services', [])

    get data() {
        return this.services.get()
    }

    get(id: number) {
        return this.services.map(data => data[id], undefined)
    }

    @Mutation
    load() {
        this.services.load(this.storage.load(),
            data => data.map(s => ({ ...s, auth: new Auth(Object.entries(s.auth)) }))
        )
    }

    save() {
        function saveAuth(auth: Auth) {
            const res: any = {}
            for (const entry of auth.entries()) {
                res[entry[0]] = entry[1]
            }
            return res
        }

        this.storage.save(this.services.map(data => data.map(
            (s: Service) => ({ ...s, auth: saveAuth(s.auth) })
        ), []))
    }

    @Mutation
    remove(id: number) {
        this.services.with(data => data.splice(id, 1))
        this.save()
    }

    @Mutation
    add(service: Service): number {
        this.services.with(data => data.push(service))
        this.save()
        return this.services.map(data => data.length - 1, -1)
    }

    @Mutation
    set(id: number, name: string, auth: Auth) {
        const service = this.get(id)
        if (service) {
            service.name = name
            service.auth = auth
            this.save()
        }
    }

}