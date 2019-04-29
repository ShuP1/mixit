<template lang="pug">
.client(@scroll.passive="onScroll")
  loadable-block.list(:loadable="guilds")
    template(#success)
      guild(v-for="guild in guilds.get()" :key="guild.id" :guild="guild" :showMedia="options.showMedia")
</template>

<script>
/* global axios */
import { timerMinin } from '../core/fromNow.vue'
import serviceEmiterVue from '../core/serviceEmiter.vue'

import guildVue from './guild.vue'
import Loadable from '../core/loadable/Loadable'
import loadableBlockVue from '../core/loadable/loadableBlock.vue'

export default {
  components: {
    guild: guildVue,
    loadableBlock: loadableBlockVue
  },
  extends: serviceEmiterVue,
  mixins: [ timerMinin ],
  props: {
    auth: {
      type: Object,
      default: () => ({})
    },
    options: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      rest: axios.create({
        baseURL: 'https://discordapp.com/api/',
        headers: { Authorization: this.auth.token },
        timeout: this.options.timeout
      }),
      guilds: new Loadable()
    }
  },
  created() {
    this.guilds.load(
      this.get('/users/@me/guilds'),
      res => res.data)

    this.setupStream()
  },
  methods: {
    get(path, options = {}) {
      return this.catchEmit(this.rest.get(path, { params: { limit: this.options.buffer, ...options } }))
    },
    onScroll() {
      /*if(!this.loadingOlder && event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop - 100 < 0) {
        this.loadingOlder = true
        this.catchEmit(this.rest.get("/timelines/home", { params: { limit: this.buffer,
          max_id: this.statues[this.statues.length - 1].id
        } })).then(res => {
            this.statues.push.apply(this.statues, res.data)
            this.loadingOlder = false
          })
      } else if(event.target.scrollTop < 20) {
        this.statues.splice(this.buffer)
      }*/
    },
    setupStream() {
      /*const ws = new WebSocket(
        `wss://${this.server}/api/v1/streaming?access_token=${this.token}&stream=user`
      )
      ws.onmessage = event => {
        event = JSON.parse(event.data)
        const payload = JSON.parse(event.payload)
        switch (event.event) {
          case "update":
            this.statues.unshift(payload)
            break

          case "notification":
            this.notifications.unshift(payload)
            break

          case "delete":
            this.removeStatus(payload)
            break
        }
      };
      ws.onerror = this.emitError
      ws.onclose = () => {
        this.emitError(
          "Mastodon stream disconnected !" +
            (this.reconnect ? " Reconnecting..." : "")
        )
        if (this.reconnect) setTimeout(() => this.setupStream(), this.timeout)
      }*/
    }
  }
}
</script>