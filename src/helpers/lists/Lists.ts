export default abstract class Lists {

  static last<T>(list: T[]) {
    return list[list.length - 1]
  }

  static getIndex<T>(list: T[], where: (val: T) => boolean) {
    for (let i = list.length - 1; i >= 0; i--){
      if (where(list[i])) {
        return i
      }
    }
    return list.length
  }

  static removeAt<T>(list: T[], id: number) {
    list.splice(id, 1)
  }

  static removeFrom<T>(list: T[], start: number) {
    list.splice(start)
  }

  static removeFirst<T>(list: T[], where: (val: T) => boolean) {
    this.removeAt(list, this.getIndex(list, where))
  }

  static removeFirstBy<T, U>(list: T[], mapper: (val: T) => U, val: U) {
    this.removeFirst(list, e => mapper(e) === val)
  }

  static pushAll<T>(list: T[], elems: T[]) {
    list.push.apply(list, elems)
  }

  static clear<T>(list: T[]) {
    list.splice(0, list.length)
  }

  static for<T>(list: T[], action: (val: T, id: number, list: T[]) => void) {
    for (let i = 0; i < list.length; i++){
      action(list[i], i, list)
    }
  }

  static sort<T, U>(list: T[], mapper: (val: T) => U, comparer: (a: U, b: U) => number) {
    return list.sort((a, b) => comparer(mapper(a), mapper(b)))
  }

  static stringCompare(a: string, b: string) {
    return ('' + a).localeCompare(b)
  }

}