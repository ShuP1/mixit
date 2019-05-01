<template lang="pug">
.guild
  | {{ guild.name }}
  img(v-if="showMedia && guild.icon" :src="`${CDN}/icons/${guild.id}/${guild.icon}.png?size=16`")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import ShowMediaMixin from '../../components/ShowMediaMixin'
import { CDN } from './Discord.vue'
import { Guild as IGuild } from './Types'

@Component
export default class Guild extends ShowMediaMixin {

  @Prop(Object)
  readonly guild!: IGuild

  get CDN() {
    return CDN
  }

}
</script>
