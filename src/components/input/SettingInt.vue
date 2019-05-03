<template lang="pug">
extends model

block input
  input(:id="id" type="number" step="1" :value="value" @keyup.enter="sendChange(parseInt($event.target.value))")
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'

import BaseSetting from './BaseSetting'

@Component
export default class SettingInt extends BaseSetting {

  @Prop({
    type: Number,
    default: 1
  })
  readonly value!: number

}
</script>
