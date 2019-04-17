<template lang="pug">
div.loadable-block
  slot(name="success" v-if="loadable.isSuccess()") {{ get }}
  slot(name="error" v-else-if="loadable.error") {{ loadable.error }}
  slot(name="loading" v-else)
    .service-loader
</template>

<script>
import Loadable from './Loadable.js'

export default {
  props: {
    loadable: Loadable
  },
  computed: {
    get() {
      return this.loadable.get()
    }
  }
}
</script>
