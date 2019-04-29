<template lang="pug">
.service-header
  .title(@click="showSettings = !showSettings")
    slot(name="title")
  .settings(v-show="showSettings")
    input.position(
      @keyup.up.ctrl.exact="onMove('x', -1)" @keyup.down.ctrl.exact="onMove('x', 1)"
      @keyup.left.ctrl.exact="onMove('y', -1)" @keyup.right.ctrl.exact="onMove('y', 1)"
      @keyup.up.alt.exact="onMove('h', -1)" @keyup.down.alt.exact="onMove('h', 1)"
      @keyup.left.alt.exact="onMove('w', -1)" @keyup.right.alt.exact="onMove('w', 1)"
      @keyup.delete.ctrl.exact="onRemove" @keyup.delete.alt.exact="onRemoveService"
    )
    slot(name="settings")
</template>

<script>
export default {
  props: {
    emit: {
      type: Function,
      default: undefined
    }
  },
  data() { return {
    showSettings: false
  } },
  methods: {
    onMove(type, direction) {
      this.emit('move', { type: type, direction: direction })
    },
    onRemove() {
      this.emit('remove', { })
    },
    onRemoveService() {
      this.emit('removeService', { })
    }
  }
}
</script>
