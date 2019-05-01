<template lang="pug">
span.loadable-inline
  slot(name="success" v-if="loadable.isSuccess") {{ get }}
  slot(name="error" v-else-if="loadable.error") {{ loadable.error }}
  slot(name="loading" v-else) Loading...
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import ErrorLoadable from '../../helpers/loadable/ErrorLoadable'

@Component
export default class LoadableInline<T, E> extends Vue {

  @Prop()
  readonly loadable!: ErrorLoadable<T, E>

  get get() {
    return this.loadable.get()
  }
}
</script>
