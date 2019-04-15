<template lang="pug">
.client
  .statues
    .header(v-if="notifications.length > 0") Accueil
    .list(v-if="statues.length > 0" @scroll="onScroll")
      template(v-for="status in statues")
        status(v-if="showStatus(status)" :key="status.id" :status="status" :now="now" :showMedia="showMedia" @mark="onStatusMark")
      .status(v-show="loadingOlder") Loading...
    template(v-else) Loading...
  .notifications(v-if="notifications.length > 0")
    .header
      | Notifications
      span.date(@click.stop.prevent="onNotificationsClear") ❌
    .list
      notification(v-for="notification in notifications" :key="notification.id" :notification="notification" :now="now" :showMedia="showMedia" @dismiss="onNotificationDismiss")
</template>

<script>
import { timerMinin } from '../core/fromNow.vue'
import { emitErrorMixin } from '../core/tools'
import statusVue from './status.vue'
import notificationVue from './notification.vue'

export default {
  mixins: [ timerMinin, emitErrorMixin ],
  components: {
    status: statusVue,
    notification: notificationVue
  },
  props: {
    server: String,
    token: String,
    timeout: Number,
    reconnect: Boolean,
    buffer: Number,
    reblog: Boolean,
    reply: Boolean,
    showMedia: Boolean
  },
  data() {
    return {
      rest: axios.create({
        baseURL: `https://${this.server}/api/v1/`,
        timeout: this.timeout,
        headers: {
          Authorization: "Bearer " + this.token
        }
      }),
      statues: [],
      notifications: [],
      now: Date.now(),
      loadingOlder: false
    };
  },
  methods: {
    onScroll(event) {
      if(!this.loadingOlder && event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop - 100 < 0) {
        this.loadingOlder = true
        this.rest
          .get("/timelines/home", { params: { limit: this.buffer,
            max_id: this.statues[this.statues.length - 1].id } })
          .then(res => {
            this.statues.push.apply(this.statues, res.data)
            this.loadingOlder = false
          })
          .catch(this.emitError)
      } else if(event.target.scrollTop < 20) {
        this.statues.splice(this.buffer)
      }
    },
    removeStatus(id) {
      for (var i = this.statues.length - 1; i >= 0; i--) {
        if (this.statues[i].id === id) {
          this.statues.splice(i, 1)
          break
        }
      }
    },
    removeNotification(id) {
      for (var i = this.notifications.length - 1; i >= 0; i--) {
        if (this.notifications[i].id === id) {
          this.notifications.splice(i, 1)
          break
        }
      }
    },
    showStatus(status) {
      return (!status.in_reply_to_id || this.reply) && (!status.reblog || this.reblog)
    },
    onStatusMark(action) {
      this.rest.post(`/statuses/${action.id}/${action.type}`)
        .then(action.callback)
        .catch(this.emitError)
    },
    onNotificationDismiss(id) {
      this.rest.post('/notifications/dismiss', { id: id })
        .then(() => this.removeNotification(id))
        .catch(this.emitError)
    },
    onNotificationsClear() {
      this.rest.post('/notifications/clear')
        .then(() => this.notifications.splice(0, this.notifications.length))
        .catch(this.emitError)
    },
    setupStream() {
      const ws = new WebSocket(
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
      }
    }
  },
  created() {
    this.rest
      .get("/timelines/home", { params: { limit: this.buffer } })
      .then(res => this.statues.push.apply(this.statues, res.data))
      .catch(this.emitError)

    this.rest
      .get("/notifications", { params: { limit: this.buffer } })
      .then(res => this.notifications.push.apply(this.notifications, res.data))
      .catch(this.emitError)

    this.setupStream()
  }
}
</script>