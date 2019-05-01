<template lang="pug">
extends model

block input
  input(:id="id" type="checkbox" :checked="value" @change.stop="sendChange($event.target.checked)")
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'

import BaseSettingVue from './BaseSetting'

@Component
export default class SettingBoolean extends BaseSettingVue {

  @Prop(Boolean)
  readonly value!: boolean

}
</script>