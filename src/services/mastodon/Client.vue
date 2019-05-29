<template lang="pug">
.client
  .statues(@scroll.passive="onScroll" v-show="!hasContext")
    .header(v-if="hasNotifications") Accueil
    success-loadable.list(:loadable="statues")
      template(v-for="status in statues.get()")
        status(v-if="showStatus(status)" :key="status.id" :status="status" :showMedia="options.showMedia" @mark="onStatusMark" @vote="onPollVote" @context="onShowContext")
      .status(v-show="statues.loadingMore")
        .service-loader

  .context(v-if="hasContext")
    .header(@click="closeContext")
      | Context
      span.date(@click.stop.prevent="closeContext") ❌
    .list
      .ancestors
        template(v-if="targetContext.isSuccess")
          status(v-for="status in targetContext.get().ancestors" :key="status.id" :status="status" :showMedia="options.showMedia" @mark="onStatusMark" @vote="onPollVote" @context="onShowContext")
        .service-loader(v-else)
      status.selected(:status="targetStatus" :showMedia="options.showMedia" @mark="onStatusMark" @vote="onPollVote" @context="closeContext")
      .descendants
        template(v-if="targetContext.isSuccess")
          status(v-for="status in targetContext.get().descendants" :key="status.id" :status="status" :showMedia="options.showMedia" @mark="onStatusMark" @vote="onPollVote" @context="onShowContext")
        .service-loader(v-else)

  .notifications(v-if="hasNotifications")
    .header
      | Notifications
      span.date(@click.stop.prevent="onNotificationsClear") ❌
    .list
      notification(v-for="notification in notifications.get()" :key="notification.id" :notification="notification"
        :showMedia="options.showMedia" @dismiss="onNotificationDismiss" @mark="onStatusMark" @vote="onPollVote" @context="onShowContext")

  .compose-toggle(@click="showCompose = !showCompose") 🖉
  .emoji-list(v-if="options.showMedia" v-show="showCompose && showEmojis")
    img.emoji(v-for="emoji in emojis.get()" @click="addEmoji(emoji.shortcode)" :src="emoji.static_url" :alt="emoji.shortcode" :title="emoji.shortcode")
  .compose(v-show="showCompose")
    textarea.content(v-model="compose.status" placeholder="message")
    .options
      .emojis
        button(v-if="options.showMedia" @click="showEmojis = !showEmojis") ☺
        select(v-else @change="addEmoji($event.target.value)")
          option(v-for="emoji in emojis.get()" :value="emoji.shortcode") {{ emoji.shortcode }}
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
import AxiosLoadable from '@/helpers/loadable/AxiosLoadable'
import AxiosLoadableMore from '@/helpers/loadable/AxiosLoadableMore'
import { AUTH, getHeaders, getRest } from './Mastodon.vue'
import Notification from './Notification.vue'
import Status from './Status.vue'
import { Context, Emoji, MarkStatus, Notification as INotification, Options, Poll, PollVote, Status as IStatus, StatusPost, TimelineType } from './Types'

const STREAMS = {
  home: 'user',
  local: 'public:local',
  public: 'public'
}

@Component({ components: { Status, Notification } })
export default class Client extends Mixins<ServiceClient<Options>>(ServiceClient) {

  rest = getRest(this.auth, this.options.timeout)

  statues = new AxiosLoadableMore<IStatus[], object>()
  notifications = new AxiosLoadable<INotification[], object>()
  emojis = new AxiosLoadable<Emoji[], object>()
  stream?: WebSocket = undefined

  targetStatus: IStatus | null = null
  targetContext = new AxiosLoadable<Context, object>()

  showCompose = false
  compose: StatusPost = {
    status: '',
    visibility: 'unlisted',
    sensitive: false,
    spoiler_text: ''
  }
  showEmojis = false // MAYBE: show tabs with unicode emoticons

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

  get hasContext() {
    return this.targetStatus && !this.targetContext.hasError
  }

  created() {
    this.$watch('options.timeline', this.init, { immediate: true })
    this.notifications.load(this.get<INotification[]>('/notifications'))
    this.emojis.load(this.get<Emoji[]>('/custom_emojis'), res => Lists.sort(res.data, e => e.shortcode, Lists.stringCompare))
  }

  init() {
    this.statues.load(this.getTimeline())
    this.setupStream()
  }

  get<T>(path: string, options = {}) {
    return this.catchEmit(this.rest.get<T>(path, { params: { limit: this.options.buffer, ...options } }))
  }

  post<T>(path: string, options = {}) {
    return this.catchEmit(this.rest.post<T>(path, options))
  }

  addEmoji(code: string) {
    this.compose.status += `:${code}:`
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
      if(this.targetStatus) {
        post.in_reply_to_id = this.targetStatus.id
      }
      this.post('/statuses', post)
      this.compose.status = ''
    }
  }

  getTimeline(options: any = {}) {
    if (this.options.timeline === 'local') {
      options.local = true
    }
    return this.get<IStatus[]>(`/timelines/${this.options.timeline === 'home' ? 'home' : 'public'}`, options)
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

  onStatusMark(action: MarkStatus) {
    this.post<IStatus>(`/statuses/${action.id}/${action.type}`)
      .then(res => this.statues.with(
        sts => Lists.setFirstBy(sts, st => st.id, action.id, res.data)
      ))
  }

  onPollVote(action: PollVote) {
    this.post<Poll>(`/polls/${action.poll}/votes`, { choices: action.choices })
      .then(res => this.statues.with(
        sts => sts.find(st => st.id === action.id)!.poll = res.data
      ))
  }

  onShowContext(status: IStatus) {
    this.statues.with(sts => {
      this.targetStatus = status
      this.targetContext.load(this.get(`/statuses/${status.id}/context`), undefined, true)
    })
  }

  closeContext() {
    this.targetStatus = null
    this.targetContext.reset()
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
    this.get<{ version: string }>('/instance').then(res => {
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
    .header, .emoji-list
      @include main-tile
    .header
      margin-bottom: 0
    .list
      @include group-tile
      flex-grow: 1
    .statues, .notifications, .context, .emoji-list
      flex-grow: 1
      display: flex
      flex-direction: column
      overflow-y: auto
    .ancestors, .descendants
      .status
        font-size: .9em
        padding: $borderRadius
        @include tile
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
    .emoji-list
      img
        width: 2em
        height: 2em
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
        .card, .poll
          @include tile
          padding: .2em
          display: block
          .provider
            float: right
      .meta
        margin-left: 1em + $avatarSize
        font-size: .8em
        .fil
          float: right
        a
          margin: 0 .5em

    .date, .dismiss
      float: right
</style>
