<template lang="pug">
.client(@scroll.passive="onScroll")
  .statues
    .header(v-if="hasNotifications") Accueil
    loadable-block.list(:loadable="statues")
      template(#success)
        template(v-for="status in statues.get()")
          status(v-if="showStatus(status)" :key="status.id" :status="status" :now="now" :showMedia="showMedia" @mark="onStatusMark")
        .status(v-show="statues.loadingMore")
          .service-loader
  .notifications(v-if="hasNotifications")
    .header
      | Notifications
      span.date(@click.stop.prevent="onNotificationsClear") ❌
    .list
      notification(v-for="notification in notifications.get()" :key="notification.id" :notification="notification" :now="now"
        :showMedia="showMedia" @dismiss="onNotificationDismiss" @mark="onStatusMark")
</template>

<script>
/* global axios */
import { timerMinin } from '../core/fromNow.vue'
import serviceEmiterVue from '../core/serviceEmiter.vue'

import Lists from '../core/Lists'

import statusVue from './status.vue'
import notificationVue from './notification.vue'

import Loadable from '../core/loadable/Loadable'
import loadableBlockVue from '../core/loadable/loadableBlock.vue'

export default {
  components: {
    status: statusVue,
    notification: notificationVue,
    loadableBlock: loadableBlockVue
  },
  extends: serviceEmiterVue,
  mixins: [ timerMinin ],
  props: {
    server: {
      type: String,
      default: undefined
    },
    token: {
      type: String,
      default: undefined
    },
    timeout: {
      type: Number,
      default: 5000
    },
    reconnect: Boolean,
    buffer: {
      type: Number,
      default: 20
    },
    reblog: Boolean,
    reply: Boolean,
    showMedia: Boolean
  },
  data() {
    return {
      rest: axios.create({
        baseURL: `https://${this.server}/api/v1/`,
        headers: { Authorization: 'Bearer ' + this.token },
        timeout: this.timeout
      }),
      statues: new Loadable(),
      notifications: new Loadable()
    }
  },
  computed: {
    hasNotifications() {
      return this.notifications.isSuccess() && this.notifications.get().length > 0
    }
  },
  created() {
    this.statues.load(
      this.getTimeline({}),
      res => res.data)

    this.notifications.load(
      this.get('/notifications'),
      res => res.data)

    this.setupStream()
  },
  methods: {
    get(path, options = {}) {
      return this.catchEmit(this.rest.get(path, { params: { limit: this.buffer, ...options } }))
    },
    post(path, options = {}) {
      return this.catchEmit(this.rest.post(path, options))
    },
    getTimeline(options) {
      return this.get('/timelines/home', options)
    },
    onScroll(event) {
      if(!this.statues.loadingMore && event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop - 100 < 0) {
        this.statues.loadMore(
          this.getTimeline({ max_id: Lists.last(this.statues.get()).id }),
          (res, statues) => Lists.pushAll(statues, res.data)
        )
      } else if(event.target.scrollTop < 20) {
        this.statues.get().splice(this.buffer)
      }
    },
    removeById(ls, id) {
      Lists.removeFirst(ls, e => e.id === id)
    },
    showStatus(status) {
      return (!status.in_reply_to_id || this.reply) && (!status.reblog || this.reblog)
    },
    onStatusMark(action) {
      this.post(`/statuses/${action.id}/${action.type}`)
        .then(action.callback)
    },
    onNotificationDismiss(id) {
      this.post('/notifications/dismiss', { id: id })
        .then(() => this.removeById(this.notifications.get(), id))
    },
    onNotificationsClear() {
      this.post('/notifications/clear')
        .then(() => Lists.clear(this.notifications.get()))
    },
    setupStream() {
      const ws = new WebSocket(
        `wss://${this.server}/api/v1/streaming?access_token=${this.token}&stream=user`
      )
      ws.onmessage = event => {
        event = JSON.parse(event.data)
        const payload = JSON.parse(event.payload)
        switch (event.event) {
          case 'update':
            this.statues.get().unshift(payload)
            break

          case 'notification':
            this.notifications.get().unshift(payload)
            break

          case 'delete':
            this.removeById(this.statues.get(), payload.id)
            break
        }
      }
      ws.onerror = this.emitError
      ws.onclose = () => {
        this.emitError(
          'Mastodon stream disconnected !' +
            (this.reconnect ? ' Reconnecting...' : '')
        )
        if (this.reconnect) setTimeout(() => this.setupStream(), this.timeout)
      }
    }
  }
}
</script>