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

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'

import * as Events from '../types/Events'
import ServiceEmiter from './ServiceEmiter'

@Component
export default class ServiceHeader extends Mixins(ServiceEmiter) {

  showSettings = false

  onMove(type: Events.MoveType, direction: Events.MoveDirection) {
    this.emit(Events.MoveTileEvent, { type, direction })
  }

  onRemove() {
    this.emit(Events.RemoveTileEvent, {})
  }

  onRemoveService() {
    this.emit(Events.RemoveServiceEvent, {})
  }

}
</script>
