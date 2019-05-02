<template lang="pug">
span.loadable-inline
  slot(name="success" v-if="loadable.isSuccess") {{ get }}
  slot(name="error" v-else-if="loadable.error") {{ loadable.error }}
  slot(name="loading" v-else) Loading...
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'

import Loadable from './Loadable'

@Component
export default class LoadableInline<T, E> extends Loadable<T, E> { }
</script>
