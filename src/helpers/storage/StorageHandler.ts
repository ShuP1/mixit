export default class StorageHandler<T> implements IStorageHandler<T> {

    constructor(protected storage: Storage, protected key: string, protected fallback: T) { }

    loadSync(): T {
        const data = this.storage.getItem(this.key)
        if (data) {
            try {
                return JSON.parse(data)
            } catch (e) {
                this.storage.removeItem(this.key)
            }
        }
        return this.fallback;
    }

    async load() {
        return this.loadSync()
    }

    save(data: T) {
        return this.storage.setItem(this.key, JSON.stringify(data))
    }

}

export interface IStorageHandler<T> {
    load(): Promise<T>
    loadSync(): T
    save(data: T): void
}