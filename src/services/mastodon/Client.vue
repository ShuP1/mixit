<template lang="pug">
.client(@scroll.passive="onScroll")
  .statues
    .header(v-if="hasNotifications") Accueil
    loadable-block.list(:loadable="statues")
      template(#success)
        template(v-for="status in statues.get()")
          status(v-if="showStatus(status)" :key="status.id" :status="status" :now="now" :showMedia="options.showMedia" @mark="onStatusMark")
        .status(v-show="statues.loadingMore")
          .service-loader
  .notifications(v-if="hasNotifications")
    .header
      | Notifications
      span.date(@click.stop.prevent="onNotificationsClear") ❌
    .list
      notification(v-for="notification in notifications.get()" :key="notification.id" :notification="notification" :now="now"
        :showMedia="options.showMedia" @dismiss="onNotificationDismiss" @mark="onStatusMark")
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios'
import { Component, Mixins } from 'vue-property-decorator'

import LoadableBlockVue from '../../components/loadable/LoadableBlock.vue'
import ServiceClient from '../../components/ServiceClient'
import TimerMixin from '../../components/time/TimerMixin'
import Lists from '../../helpers/lists/Lists'
import AxiosLodable from '../../helpers/loadable/AxiosLoadable'
import AxiosLodableMore from '../../helpers/loadable/AxiosLoadableMore'
import { AUTH, getRest } from './Mastodon.vue'
import NotificationVue from './Notification.vue'
import StatusVue from './Status.vue'
import { MarkMessage, Notification, Options, Status } from './Types'

@Component({
  components: {
    status: StatusVue,
    notification: NotificationVue,
    loadableBlock: LoadableBlockVue
  }
})
export default class Client extends Mixins<ServiceClient<Options>>(ServiceClient, TimerMixin) {

  rest = getRest(this.auth, this.options.timeout)

  statues = new AxiosLodableMore<Status[], object>()
  notifications = new AxiosLodable<Notification[], object>()

  get hasNotifications() {
    if(!this.notifications.isSuccess) {
      return false
    }

    const not = this.notifications.get()
    if(not){
      return not.length > 0
    } else {
      return false
    }
  }

  created() {
    this.statues.load(this.getTimeline())
    this.notifications.load(this.get('/notifications'))
    this.setupStream()
  }

  get(path: string, options = {}) {
    return this.catchEmit(this.rest.get(path, { params: { limit: this.options.buffer, ...options } }))
  }

  post(path: string, options = {}) {
    return this.catchEmit(this.rest.post(path, options))
  }

  getTimeline(options = {}) {
    return this.get('/timelines/home', options)
  }

  onScroll(event: any) {
    if(!this.statues.isLoadingMore && event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop - 100 < 0) {
      this.statues.loadMore(
        this.getTimeline({ max_id: this.statues.map(s => Lists.last(s).id , 0) }),
        (res, statues) => Lists.pushAll(statues, res.data)
      )
    } else if(event.target.scrollTop < 20) {
      this.statues.with(s => Lists.removeFrom(s, this.options.buffer))
    }
  }

  showStatus(status: Status) {
    return (!status.in_reply_to_id || this.options.reply) && (!status.reblog || this.options.reblog)
  }

  onStatusMark(action: MarkMessage) {
    this.post(`/statuses/${action.id}/${action.type}`)
      .then(() => action.callback())
  }

  onNotificationDismiss(id: number) {
    this.post('/notifications/dismiss', { id })
      .then(() => this.notifications.with(
        ns => Lists.removeFirstBy(ns, n => n.id, id)))
  }

  onNotificationsClear() {
    this.post('/notifications/clear')
      .then(() => this.notifications.with(
        ns => Lists.clear(ns)))
  }

  setupStream() {
    const ws = new WebSocket(
      `wss://${this.auth.get(AUTH.SERVER)}/api/v1/streaming?access_token=${this.auth.get(AUTH.TOKEN)}&stream=user`
    )
    ws.onmessage = event => {
      const data = JSON.parse(event.data)
      const payload = JSON.parse(data.payload)
      switch (data.event) {
        case 'update':
          this.statues.with(s => s.unshift(payload))
          break

        case 'notification':
          this.notifications.with(n => n.unshift(payload))
          break

        case 'delete':
          this.statues.with(st => Lists.removeFirstBy(st, s => s.id, payload.id))
          break
      }
    }
    ws.onerror = ev => this.emitError(ev.type)
    ws.onclose = () => {
      this.emitError(
        'Mastodon stream disconnected !' +
          (this.options.reconnect ? ' Reconnecting...' : '')
      )
      if (this.options.reconnect) {
        setTimeout(() => this.setupStream(), this.options.timeout)
      }
    }
  }
}
</script>


<style lang="sass">
@import '../../common.sass'

.mastodon
  .client
    display: flex
    height: 100%
    overflow-y: auto
    .header
      @include tile
    .list
      & > div
        @include tile
    .statues
      flex: 1
    .notifications
      max-width: 33%

    .account
      .name
        margin: 0 $borderRadius
        color: $foreColor
      .avatar
        float: left
        border-radius: $borderRadius
        width: $avatarSize
        height: $avatarSize
        background-size: $avatarSize $avatarSize
      div
        display: inline-block

    .status, .notification
      min-height: $avatarSize
      .content
        margin: .5em .5em .5em 1em
        &.avatared
          margin-left: .5em + $avatarSize
        .reblog
          font-size: .8em
        .spoiler
          margin-bottom: .5em
        .media
          margin: .5em
          position: relative
          display: inline-block
          & > *
            max-height: 10em
            max-width: 100%
          .gif
            position: absolute
            top: 0
            bottom: 0
            left: 0
            right: 0
            height: 100%
            width: 100%
            background-color: #00000044
            color: white
            padding: .5em
      .meta
        margin-left: 1em + $avatarSize
        font-size: .8em
        a
          margin: 0 .5em

    .date, .dismiss
      float: right
</style>
