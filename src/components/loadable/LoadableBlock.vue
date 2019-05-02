<template lang="pug">
div.loadable-block
  slot(name="success" v-if="loadable.isSuccess") {{ get }}
  slot(name="error" v-else-if="loadable.error") {{ loadable.error }}
  slot(name="loading" v-else)
    .service-loader
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'

import Loadable from './Loadable'

@Component
export default class LoadableBlock<T, E> extends Loadable<T, E> { }
</script>
