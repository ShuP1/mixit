export class Selectable<T> {

  protected selectedId = 0

  constructor(public data: T[]){ }

  get selected(): T | undefined {
    return this.data[this.selectedId]
  }

  get selectedKey() {
    return this.selectedId
  }

  select(key: number) {
    this.selectedId = key
  }

  isSelected(key: number) {
    return this.selectedId === key
  }

  remove() {
    this.data.splice(this.selectedId, 1)
    this.selectedId = 0
    return this
  }

  with(call: (selected: T) => void) {
    if (this.selected) {
      call(this.selected)
    }
  }

}