<template lang="pug">
div.loadable-block
  slot(name="success" v-if="loadable.isSuccess") {{ get }}
  slot(name="error" v-else-if="loadable.error") {{ loadable.error }}
  slot(name="loading" v-else)
    .service-loader
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import ErrorLoadable from '../../helpers/loadable/ErrorLoadable'

@Component
export default class LoadableBlock<T, E> extends Vue {

  @Prop()
  readonly loadable!: ErrorLoadable<T, E>

  get get() {
    return this.loadable.get()
  }
}
</script>
