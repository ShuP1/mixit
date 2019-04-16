<template lang="pug">
extends model

block input
  input(:id="id" type="checkbox" :checked="value" @change.stop="sendChange($event.target.checked)")
</template>

<script>
import baseSettingVue from './baseSetting.vue'
export default {
  extends: baseSettingVue,
  props: { value: Boolean }
}
</script>
