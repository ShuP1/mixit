<template lang="pug">
extends model

block input
  input(:id="id" type="text" :value="value" @keyup.enter="sendChange($event.target.value)")
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'

import BaseSetting from './BaseSetting'

@Component
export default class SettingString extends BaseSetting {

  @Prop(String)
  readonly value!: string

}
</script>
