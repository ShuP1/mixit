<template lang="pug">
extends model

block input
  select(:id="id" :value="value" @change="sendChange($event.target.value)")
    option(v-for="option in options" :value="option") {{ option }}
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'

import BaseSetting from './BaseSetting'

@Component
export default class SettingSelect extends BaseSetting {

  @Prop(String)
  readonly value!: string

  @Prop(Array)
  readonly options!: string[]

}
</script>
