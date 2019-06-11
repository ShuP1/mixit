<template lang="pug">
extends model

block input
  input(:id="id" ref="input" type="checkbox" :checked="value" @change.stop="handleChange")
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'

import BaseSetting from './BaseSetting'

@Component
export default class SettingHeritBoolean extends BaseSetting {

  @Prop(Boolean)
  readonly value!: boolean | undefined

  mounted () {
    const input: any = this.$refs.input
    input.indeterminate = this.value === undefined
  }

  handleChange() {
    this.sendChange(this.value === false ? undefined : !this.value)
  }

}
</script>