<template lang="pug">
.client(@scroll.passive="onScroll")
  .statues
    .header(v-if="hasNotifications") Accueil
    success-loadable.list(:loadable="statues")
      template(v-for="status in statues.get()")
        status(v-if="showStatus(status)" :key="status.id" :status="status" :showMedia="options.showMedia" @mark="onStatusMark")
      .status(v-show="statues.loadingMore")
        .service-loader
  .notifications(v-if="hasNotifications")
    .header
      | Notifications
      span.date(@click.stop.prevent="onNotificationsClear") ❌
    .list
      notification(v-for="notification in notifications.get()" :key="notification.id" :notification="notification"
        :showMedia="options.showMedia" @dismiss="onNotificationDismiss" @mark="onStatusMark")
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios'
import { Component, Mixins } from 'vue-property-decorator'

import ServiceClient from '@/components/ServiceClient'
import Lists from '@/helpers/lists/Lists'
import AxiosLodable from '@/helpers/loadable/AxiosLoadable'
import AxiosLodableMore from '@/helpers/loadable/AxiosLoadableMore'
import { AUTH, getRest } from './Mastodon.vue'
import Notification from './Notification.vue'
import Status from './Status.vue'
import { MarkMessage, Notification as INotification, Options, Status as IStatus } from './Types'

@Component({ components: { Status, Notification } })
export default class Client extends Mixins<ServiceClient<Options>>(ServiceClient) {

  rest = getRest(this.auth, this.options.timeout)

  statues = new AxiosLodableMore<IStatus[], object>()
  notifications = new AxiosLodable<INotification[], object>()

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
    return this.catchError(this.rest.get(path, { params: { limit: this.options.buffer, ...options } }))
  }

  post(path: string, options = {}) {
    return this.catchError(this.rest.post(path, options))
  }

  getTimeline(options = {}) {
    return this.get('/timelines/home', options)
  }

  onScroll(event: any) {
    this.statues.handleScroll(event.target,
      st => this.getTimeline({ max_id: Lists.last(st).id }),
      (res, st) => Lists.pushAll(st, res.data),
      st => Lists.removeFrom(st, this.options.buffer)
    )
  }

  showStatus(status: IStatus) {
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
    ws.onerror = ev => this.addError(ev.type)
    ws.onclose = () => {
      this.addError(
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
@import '@/common.sass'

.mastodon
  .client
    display: flex
    height: 100%
    overflow-y: auto
    .header
      @include main-tile
    .list
      @include group-tile
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
        @include rounded
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
