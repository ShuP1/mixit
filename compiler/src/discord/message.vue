<template lang="pug">
.message {{ message }}
</template>

<script>
import fromNowVue, { timedMixin } from '../core/fromNow.vue'

export default {
  mixins: [ timedMixin ],
  components: {
    fromNow: fromNowVue
  },
  props: {
    message: Object,
    showMedia: {
      type: Boolean,
      default: true
    }
  },
  methods: { }
}
</script>
