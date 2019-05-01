export default class WebStorageHandler<T> { // TODO: extends loadable
  constructor(protected storage: Storage, protected key: string, protected data: T,
    protected loader: (value: any) => T = (v => v), protected saver: (me: T) => any = (v => v)) {
  }

  get() {
    return this.data
  }

  set(value: T) {
    this.data = value
    this.save()
  }

  edit(mapper: (data: T) => T) {
    this.set(mapper(this.get()))
  }

  load() {
    const data = this.storage.getItem(this.key)
    if (data) {
      try {
        this.data = this.loader(JSON.parse(data))
      } catch (e) {
        this.storage.removeItem(this.key)
      }
    }
  }

  save() {
    this.storage.setItem(this.key, JSON.stringify(this.saver(this.data)))
  }
}