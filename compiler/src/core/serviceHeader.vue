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
    )
    slot(name="settings")
</template>

<script>
export default {
  data() { return {
    showSettings: false
  } },
  props: {
    emit: Function
  },
  methods: {
    onMove(type, direction) {
      this.emit('move', { type: type, direction: direction })
    },
  }
}
</script>
