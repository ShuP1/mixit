<template lang="pug">
.status
  account(v-if="withAccount" :account="status.account" :bus="bus")

  span.text-icon.letter(v-if="status.reblog") {{ reblogIcon }}

  a.date(target="_blank" :href="status.uri") {{ fromNow(status.created_at) }}

  .content(:class="{ avatared: showMedia }")
    template(v-if="!status.reblog")
      .spoiler(v-if="status.spoiler_text" @click.stop.prevent="status.sensitive = !status.sensitive").
        {{ status.spoiler_text || 'Spoiler' }} {{ status.sensitive ? '&rarr;' : '&darr;' }}
      div(v-if="!status.spoiler_text || !status.sensitive")
        .text(v-html="parseEmojis(status.content, status.emojis, showMedia)")

        .poll(v-if="status.poll")
          .date {{ fromNow(status.poll.expires_at) }}
          form.options(@submit.prevent="makeVote($event.target.elements)")
            .option(v-for="option in status.poll.options")
              input(v-if="!status.poll.expired && !status.poll.voted" :type="status.poll.multiple ? 'checkbox' : 'radio'" :id="status.poll.id + option.title" :value="option.title" :name="status.poll.id")
              label(:for="status.poll.id + option.title")
                | {{ option.title }}
                span.note {{ option.votes_count }}
            button(v-if="status.poll.voted") voted
            button(v-else-if="status.poll.expired") expired
            input(v-else type="submit" value="vote")

        a.media(v-for="media in status.media_attachments" :href="media.url" target="_blank")
          template(v-if="bus.showMedia")
            img(v-if="media.type == 'image' || media.type == 'gifv'" :src="media.preview_url" :alt="media.description" :title="media.description")
            template(v-else) Wrong type
            .gif(v-if="media.type == 'gifv'") GIF
          template(v-else) Hidden media {{ media.description }}

        a.card(v-if="status.card" :href="status.card.url" target="_blank")
          a.provider(v-if="status.card.provider_name" :src="status.card.provider_url" target="_blank") {{ status.card.provider_name }}
          .title {{ status.card.title }}
          .descr {{ status.card.description }}
          template(v-if="status.card.image")
            img(v-if="showMedia" :src="status.card.image")
            a(v-else-if="status.card.type == 'photo'" :src="status.card.image" target="_blank") Hidden media

    status.reblog(v-else :status="status.reblog" :bus="bus")

  .meta(v-if="!status.reblog")
    status-meta(v-for="meta in metas" :key="meta.name" :meta="meta" :bus="bus")
    a {{ statusVisibilityIcon }}
    a.fil(@click.stop.prevent="showContext")
      | {{ contextIcon }}
</template>

<script lang="ts">
import { Component, Emit, Mixins, Prop } from 'vue-property-decorator'

import FromNowMixin from '@/components/FromNowMixin'
import Account from './Account.vue'
import BusMixin, { LocalEvents } from './BusMixin'
import { Context, Notification, Visibility } from './Icons'
import { ParseEmojisMixin } from './ParseEmojisMixin'
import StatusMeta from './StatusMeta.vue'
import { Card, MarkStatus, MarkStatusType, Poll, PollVote, Status as IStatus } from './Types'

@Component({ components: { Account, StatusMeta } })
export default class Status extends Mixins(ParseEmojisMixin, FromNowMixin, BusMixin) {

  @Prop(Object)
  readonly status!: IStatus

  @Prop({ type: Boolean, default: true })
  readonly withAccount!: boolean

  get statusVisibilityIcon() {
    return Visibility[this.status.visibility] || '?'
  }

  get reblogIcon() {
    return Notification.reblog
  }

  get contextIcon() {
    if(this.status.in_reply_to_id) {
      return Context[this.status.replies_count ? 'full' : 'up']
    } else {
      return Context[this.status.replies_count ? 'down' : 'no']
    }
  }

  get showMedia() {
    return this.bus.$data.showMedia
  }

  get metas() {
    return [
      { name: 'reply', click: this.makeReply, active: false, icon: Notification.mention, count: this.status.replies_count },
      { name: 'reblog', click: this.makeReblog, active: this.status.reblogged, icon: Notification.reblog, count: this.status.reblogs_count },
      { name: 'fav', click: this.makeFav, active: this.status.favourited, icon: Notification.favourite, count: this.status.favourites_count }
    ]
  }

  makeVote(elements: HTMLInputElement[]) {
    const choices = Object.values(elements).filter(e => e.checked).map(e => e.value)
    if(choices.length > 0) {
      this.bus.$emit(LocalEvents.Vote, { id: this.status.id, poll: this.status.poll!.id, choices })
    }
  }

  makeMark(action: string, undo: boolean) {
    this.bus.$emit(LocalEvents.Mark, {
      id: this.status.id, type: (undo ? 'un' : '') + action as MarkStatusType
    })
  }

  makeReblog() {
    this.makeMark('reblog', this.status.reblogged)
  }

  makeFav() {
    this.makeMark('favourite', this.status.favourited)
  }

  showContext() {
    this.bus.$emit(LocalEvents.Context, this.status)
  }

  makeReply() {
    throw this // TODO:
  }

}
</script>