<template lang="pug">
extends model

block input
  input(:id="id" type="number" step="1" :value="value" @keyup.enter="sendChange(parseInt($event.target.value))")
</template>

<script>
import baseSettingVue from './baseSetting.vue'
export default {
  extends: baseSettingVue,
  props: {
    value: {
      type: Number,
      default: 1
    }
  }
}
</script>
