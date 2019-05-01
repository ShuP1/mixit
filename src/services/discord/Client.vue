<template lang="pug">
.client(@scroll.passive="onScroll")
  loadable-block.list(:loadable="guilds")
    template(#success)
      guild(v-for="guild in guilds.get().data" :key="guild.id" :guild="guild" :showMedia="options.showMedia")
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios'
import { Component, Mixins } from 'vue-property-decorator'

import LoadableBlockVue from '../../components/loadable/LoadableBlock.vue'
import ServiceClient from '../../components/ServiceClient'
import TimerMixin from '../../components/time/TimerMixin'
import { Selectable } from '../../helpers/lists/Selectable'
import AxiosLoadable from '../../helpers/loadable/AxiosLoadable'
import { AUTH, getRest } from './Discord.vue'
import GuildVue from './Guild.vue'
import { Guild, Options } from './Types'

@Component({
  components: {
    guild: GuildVue,
    loadableBlock: LoadableBlockVue
  }
})
export default class Client extends Mixins<ServiceClient<Options>>(ServiceClient, TimerMixin) {

  rest = getRest(this.auth, this.options.timeout)

  guilds = new AxiosLoadable<Selectable<Guild>, object>()

  created() {
    this.guilds.load(
      this.get('/users/@me/guilds'),
      res => new Selectable(res.data))
  }

  get(path: string, options = {}) {
    return this.catchEmit(this.rest.get(path, { params: { limit: this.options.buffer, ...options } }))
  }

}
</script>