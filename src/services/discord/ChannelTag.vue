<template lang="pug">
.channel(:class="{ danger: channel.nsfw }") {{ name }}
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'

import ShowMediaMixin from '@/components/ShowMediaMixin'
import { MappedChannel } from './Types'

const MAX_LENGTH = 20

@Component
export default class ChannelTag extends ShowMediaMixin {

  @Prop(Object)
  readonly channel!: MappedChannel

  get name() {
    return (this.channel.parent && this.channel.parent.name ? this.channel.parent.name + ' / ' : '')
      + (this.channel.name || this.channel.id)
  }

}
</script>
