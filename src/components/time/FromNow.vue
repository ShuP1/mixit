<template lang="pug">
span {{ timeSince }}
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import TimedMixin from './TimedMixin'

@Component
export default class FromNow extends Mixins(TimedMixin) {

  protected static toNumber(date: Date | number | string) {
    return Number(new Date(date))
  }

  @Prop([Date, Number, String])
  readonly date!: Date | number | string

  get timeSince() {
    const seconds = Math.floor((FromNow.toNumber(this.now) - FromNow.toNumber(this.date)) / 1000)

    let interval = Math.floor(seconds / 31536000)

    if (interval > 1) {
      return interval + ' years'
    }
    interval = Math.floor(seconds / 2592000)
    if (interval > 1) {
      return interval + ' months'
    }
    interval = Math.floor(seconds / 86400)
    if (interval > 1) {
      return interval + ' days'
    }
    interval = Math.floor(seconds / 3600)
    if (interval > 1) {
      return interval + ' hours'
    }
    interval = Math.floor(seconds / 60)
    if (interval > 1) {
      return interval + ' minutes'
    }
    return Math.floor(seconds) + ' seconds'
  }
}
</script>