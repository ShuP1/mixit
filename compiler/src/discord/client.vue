<template lang="pug">
.client(@scroll.passive="onScroll")
  .list(v-if="messages.length > 0")
    template(v-for="message in messages")
      message(:key="message.id" :message="message" :now="now" :showMedia="showMedia")
    .message(v-show="loadingOlder")
      .service-loader
  .service-loader(v-else)
</template>

<script>
import { timerMinin } from '../core/fromNow.vue'
import serviceEmiterVue from '../core/serviceEmiter.vue'

import messageVue from './message.vue'

export default {
  extends: serviceEmiterVue,
  mixins: [ timerMinin ],
  components: {
    message: messageVue
  },
  props: {
    token: String,
    timeout: Number,
    reconnect: Boolean,
    buffer: Number,
    showMedia: Boolean
  },
  data() {
    return {
      rest: axios.create({
        baseURL: 'https://discordapp.com/api/',
        timeout: this.timeout,
        headers: {
          Authorization: this.token
        }
      }),
      now: Date.now(),
      messages: [],
      loadingOlder: false
    };
  },
  methods: {
    onScroll(event) {
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
  },
  created() {
    /*this.rest
      .get("/timelines/home", { params: { limit: this.buffer } })
      .then(res => this.statues.push.apply(this.statues, res.data))
      .catch(this.emitError)*/

    this.setupStream()
  }
}
</script>