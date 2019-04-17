export default {
  last(list) {
    return list[list.length - 1]
  },
  getIndex(list, where) {
    for(let i = list.length - 1; i >= 0; i--)
      if(where(list[i])) return i

    return list.length
  },
  removeAt(list, id) {
    list.splice(id, 1)
  },
  removeFirst(list, where) {
    this.removeAt(list, this.getIndex(list, where))
  },
  pushAll(list, elems) {
    list.push.apply(list, elems)
  },
  clear(list) {
    list.splice(0, list.length)
  },
  for(list, action) {
    for(let i = 0; i < list.length; i++)
      action(list[i], i, list)
  }
}