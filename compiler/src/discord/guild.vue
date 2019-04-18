<template lang="pug">
.guild
  | {{ guild.name }}
  img(v-if="showMedia && guild.icon" :src="`${CDN}/icons/${guild.id}/${guild.icon}.png?size=16`")
</template>

<script>
import { CDN } from './tools.js'

export default {
  props: {
    guild: {
      type: Object,
      default: undefined
    },
    showMedia: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    CDN() {
      return CDN
    }
  }
}
</script>
