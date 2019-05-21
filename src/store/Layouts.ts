import { Selectable } from '@/helpers/lists/Selectable'
import PromiseLoadable from '@/helpers/loadable/PromiseLoadable'
import StorageHandler from '@/helpers/storage/StorageHandler'
import { Layout, Tile, Options, MoveType, MoveDirection } from '@/types/App'
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

export interface LayoutsState {
    layouts: PromiseLoadable<Selectable<Layout>, string>
}

@Module({ name: 'services', namespaced: true })
export default class Layouts extends VuexModule implements LayoutsState {
    layouts = new PromiseLoadable<Selectable<Layout>, string>() // TODO: create increment id storage
    private storage = new StorageHandler<Layout[]>(window.localStorage, 'services', [{ name: 'main', tiles: [] }])

    get data() {
        return this.layouts.get()
    }
    get current() {
        return this.layouts.map(l => l.selected, undefined)
    }
    get tiles() {
        return this.current ? this.current.tiles : []
    }

    getTile(id: number) {
        return this.tiles[id]
    }

    @Mutation
    load() {
        this.layouts.load(this.storage.load(),
            data => new Selectable<Layout>(data))
    }

    save() {
        this.storage.save(this.layouts.map(l => l.data, []))
    }

    @Mutation
    select(id: number) {
        this.layouts.with(l => l.select(id))
    }

    @Mutation
    remove() {
        this.layouts.with(l => l.remove())
        this.save()
    }

    @Mutation
    removeTile(id: number) {
        const layout = this.current
        if (layout) {
            layout.tiles.splice(id, 1)
            this.save()
        }
    }

    @Mutation
    add(layout: Layout) {
        this.layouts.with(l => l.data.push(layout))
        this.save()
    }

    @Mutation
    addTile(tile: Tile) {
        const layout = this.current
        if (layout) {
            layout.tiles.push(tile)
            this.save()
        }
    }

    @Mutation
    setName(name: string) {
        const layout = this.current
        if (layout) {
            layout.name = name
            this.save()
        }
    }

    @Mutation
    setTileOption(id: number, key: string, value: any) {
        const tile = this.getTile(id)
        if (tile) {
            tile.options[key] = value
            this.save()
        }
    }

    @Mutation
    setTileOptions(id: number, options: Options) {
        const tile = this.getTile(id)
        if (tile) {
            tile.options = options
            this.save()
        }
    }

    @Mutation
    moveTile(id: number, type: MoveType, direction: MoveDirection) {
        const tile = this.getTile(id)
        if (tile) {
            tile.position[type] = Math.max(1,
                (tile.position[type] || 1) + direction
            )
            this.save()
        }
    }

}