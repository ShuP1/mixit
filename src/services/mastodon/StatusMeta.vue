<template lang="pug">
a(:class="{ colored: meta.active }" @click.stop.prevent="meta.click")
  span.text-icon {{ meta.icon }}
  template(v-if="showCounts") {{ meta.count }}
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'

import BusMixin from './BusMixin'

@Component
export default class StatusMeta extends Mixins(BusMixin) {

  @Prop(Object)
  readonly meta!: object

  get showCounts() {
    return this.bus.$data.showCounts
  }

}
</script>
