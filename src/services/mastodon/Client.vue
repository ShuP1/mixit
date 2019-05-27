<template lang="pug">
.client
  .statues(@scroll.passive="onScroll")
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
  .compose-toggle(@click="showCompose = !showCompose") 🖉
  .compose(v-show="showCompose")
    textarea.content(v-model="compose.status" placeholder="message")
    .options
      .sens
        label.note(for="sensitive") Sensitive:&nbsp;
        input(id="sensitive" v-model="compose.sensitive" type="checkbox")
      .cw
        input(v-show="compose.sensitive" v-model="compose.spoiler_text" placeholder="content warning")
      .visibility
        select(v-model="compose.visibility")
          option(value="public") ◍
          option(value="unlisted") 👁
          option(value="private") ⚿
          option(value="direct") ✉
        span.note {{ compose.visibility }}
      button(@click="sendStatus") Toot
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios'
import { Component, Mixins, Prop } from 'vue-property-decorator'

import ServiceClient from '@/components/ServiceClient'
import Lists from '@/helpers/lists/Lists'
import AxiosLodable from '@/helpers/loadable/AxiosLoadable'
import AxiosLodableMore from '@/helpers/loadable/AxiosLoadableMore'
import { AUTH, getHeaders, getRest } from './Mastodon.vue'
import Notification from './Notification.vue'
import Status from './Status.vue'
import { MarkMessage, Notification as INotification, Options, Status as IStatus, StatusPost, TimelineType } from './Types'

const STREAMS = {
  home: 'user',
  local: 'public:local',
  public: 'public'
}

@Component({ components: { Status, Notification } })
export default class Client extends Mixins<ServiceClient<Options>>(ServiceClient) {

  /*
    home: timelines/home
    local: timelines/public?local=true
    public: timelines/public?...
  */

  rest = getRest(this.auth, this.options.timeout)

  statues = new AxiosLodableMore<IStatus[], object>()
  notifications = new AxiosLodable<INotification[], object>()
  stream?: WebSocket = undefined

  showCompose = false
  compose: StatusPost = {
    status: '',
    visibility: 'unlisted',
    sensitive: false,
    spoiler_text: ''
  }

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
    this.$watch('options.timeline', this.init, { immediate: true })
    this.notifications.load(this.get('/notifications'))
  }

  init() {
    this.statues.load(this.getTimeline())
    this.setupStream()
  }

  get(path: string, options = {}) {
    return this.catchEmit(this.rest.get(path, { params: { limit: this.options.buffer, ...options } }))
  }

  post(path: string, options = {}) {
    return this.catchEmit(this.rest.post(path, options))
  }

  sendStatus() {
    if(this.compose.status) {
      const post: StatusPost = {
        status: this.compose.status,
        visibility: this.compose.visibility
      }
      if(this.compose.sensitive) {
        post.sensitive = true
        if(this.compose.spoiler_text) {
          post.spoiler_text = this.compose.spoiler_text
        }
      }
      this.post('/statuses', post)
      this.compose.status = ''
    }
  }

  getTimeline(options: any = {}) {
    if (this.options.timeline === 'local') {
      options.local = true
    }
    return this.get(`/timelines/${this.options.timeline === 'home' ? 'home' : 'public'}`, options)
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
    if(this.stream) {
      this.stream.close()
    }
    this.get('/instance').then(res => {
      const oldAuth = res.data.version < '2.8.4' ? `access_token=${this.auth.get(AUTH.TOKEN)}&` : ''
      this.stream = new WebSocket(
        `wss://${this.auth.get(AUTH.SERVER)}/api/v1/streaming?${oldAuth}stream=${STREAMS[this.options.timeline]}`,
        this.auth.get(AUTH.TOKEN)
      )
      this.stream.onmessage = event => {
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
      this.stream.onerror = ev => this.emitError(ev.type)
      this.stream.onclose = () => {
        this.emitError(
          'Mastodon stream disconnected !' +
            (this.options.reconnect ? ' Reconnecting...' : '')
        )
        if (this.options.reconnect) {
          setTimeout(() => this.setupStream(), this.options.timeout)
        }
      }
    })
  }
}
</script>


<style lang="sass">
@import '@/common.sass'

.mastodon
  .client
    display: flex
    flex-direction: column
    height: 100%
    overflow: hidden
    position: relative
    .header
      @include main-tile
    .list
      @include group-tile
    .statues
      flex: 1
      overflow-y: auto
    .notifications
      max-width: 33%
    .compose-toggle
      position: absolute
      bottom: .5em
      right: 1.5em
      background-color: $backColor
      border: 1px solid $darkColor
      border-radius: 100%
      height: 2em
      width: 2em
      text-align: center
      line-height: 2em
    .compose
      @include main-tile
      display: flex
      min-height: 5em
      textarea
        flex: 1
      .options
        margin-right: 1em

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
        .card
          @include tile
          padding: .2em
          display: block
          .provider
            float: right
      .meta
        margin-left: 1em + $avatarSize
        font-size: .8em
        a
          margin: 0 .5em

    .date, .dismiss
      float: right
</style>
