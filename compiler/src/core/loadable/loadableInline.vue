<template lang="pug">
span.loadable-inline
  slot(name="success" v-if="loadable.isSuccess()") {{ get }}
  slot(name="error" v-else-if="loadable.error") {{ loadable.error }}
  slot(name="loading" v-else) Loading...
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
