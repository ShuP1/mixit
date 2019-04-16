<template lang="pug">
.service-header
  .title(@click="showSettings = !showSettings")
    slot(name="title")
  .settings(v-show="showSettings")
    slot(name="settings")
</template>

<script>
export default {
  data() { return {
    showSettings: false
  } }
}
</script>
