import WebStorageHandler from './WebStorageHandler'

export default class LocalStorageHandler<T> extends WebStorageHandler<T> {
  constructor(key: string, data: T, loader?: (value: any) => T, saver?: (me: T) => any) {
    super(window.localStorage, key, data, loader, saver)
  }
}