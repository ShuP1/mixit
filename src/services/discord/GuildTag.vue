<template lang="pug">
.guild
  | {{ name }}
  img(v-if="iconShow" :src="iconSrc")
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'

import ShowMediaMixin from '@/components/ShowMediaMixin'
import { CDN } from './Discord.vue'
import { PartialGuild } from './Types'

const MAX_LENGTH = 20

@Component
export default class GuildTag extends ShowMediaMixin {

  @Prop(Object)
  readonly guild!: PartialGuild

  @Prop({
    type: Number,
    default: 16
  })
  readonly size!: number

  get name() {
    const n = this.guild.name
    return n.length > MAX_LENGTH ? n.substr(0, MAX_LENGTH) + '…' : n
  }

  get iconShow() {
    return this.showMedia && this.guild.icon
  }

  get iconSrc() {
    return `${CDN}/icons/${this.guild.id}/${this.guild.icon}.png?size=${this.size}`
  }

}
</script>
