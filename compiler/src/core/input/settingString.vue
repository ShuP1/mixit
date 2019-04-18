<template lang="pug">
extends model

block input
  input(:id="id" type="text" :value="value" @keyup.enter="sendChange($event.target.value)")
</template>

<script>
import baseSettingVue from './baseSetting.vue'
export default {
  extends: baseSettingVue,
  props: {
    value: {
      type: String,
      default: undefined
    }
  }
}
</script>
