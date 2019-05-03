<template lang="pug">
div.loadable-block
  slot(v-if="loadable.isSuccess") {{ get }}
  template(v-else-if="loadable.error") {{ loadable.error }}
  template(v-else)
    .service-loader
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'

import Loadable from './Loadable'

@Component
export default class SuccessLoadableBlock<T, E> extends Loadable<T, E> { }
</script>
