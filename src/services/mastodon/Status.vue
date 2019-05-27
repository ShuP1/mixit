<template lang="pug">
.status
  account(v-if="withAccount" :account="status.account" :showMedia="showMedia")

  span.text-icon.letter(v-if="status.reblog") ⟳

  a.date(target="_blank" :href="status.uri") {{ fromNow(status.created_at) }}

  .content(:class="{ avatared: showMedia }")
    template(v-if="!status.reblog")
      .spoiler(v-if="status.spoiler_text" @click.stop.prevent="status.sensitive = !status.sensitive").
        {{ status.spoiler_text || 'Spoiler' }} {{ status.sensitive ? '&rarr;' : '&darr;' }}
      div(v-if="!status.spoiler_text || !status.sensitive")
        .text(v-html="parseEmojis(status.content, status.emojis, showMedia)")
        a.media(v-for="media in status.media_attachments" :href="media.url" target="_blank")
          template(v-if="showMedia")
            img(v-if="media.type == 'image' || media.type == 'gifv'" :src="media.preview_url" :alt="media.description" :title="media.description")
            template(v-else) Wrong type
            .gif(v-if="media.type == 'gifv'") GIF
          template(v-else) Hidden media {{ media.description }}
        .poll(v-if="status.poll") {{ renderPoll(status.poll) }}
        a.card(v-if="status.card" :href="status.card.url" target="_blank")
          a.provider(v-if="status.card.provider_name" :src="status.card.provider_url" target="_blank") {{ status.card.provider_name }}
          .title {{ status.card.title }}
          .descr {{ status.card.description }}
          template(v-if="status.card.image")
            img(v-if="showMedia" :src="status.card.image")
            a(v-else-if="status.card.type == 'photo'" :src="status.card.image" target="_blank") Hidden media
    status.reblog(v-else :status="status.reblog" :showMedia="showMedia")

  .meta(v-if="!status.reblog")
    a.replies(@click.stop.prevent="makeReply(status)")
      span.text-icon ✉
      | {{ status.replies_count }}
    a.reblogs(:class="{ colored: status.reblogged }" @click.stop.prevent="makeReblog(status)")
      span.text-icon ⟳
      | {{ status.reblogs_count }}
    a.favourites(:class="{ colored: status.favourited }" @click.stop.prevent="makeFav(status)")
      span.text-icon ⚝
      | {{ status.favourites_count }}
    a.fil(v-if="status.in_reply_to_id" @click.stop.prevent="showReply(status.in_reply_to_id)")
      | Voir le fil
</template>

<script lang="ts">
import { Component, Emit, Mixins, Prop } from 'vue-property-decorator'

import FromNowMixin from '@/components/FromNowMixin'
import ShowMediaMixin from '@/components/ShowMediaMixin'
import Account from './Account.vue'
import { ParseEmojisMixin } from './ParseEmojisMixin'
import { Card, MarkMessage, Poll, Status as IStatus } from './Types'

@Component({ components: { Account } })
export default class Status extends Mixins(ParseEmojisMixin, ShowMediaMixin, FromNowMixin) {

  @Prop(Object)
  readonly status!: IStatus

  @Prop({ type: Boolean, default: true })
  readonly withAccount!: boolean

  showReply(statusId: number) {
    throw statusId // TODO:
  }

  makeReply(status: IStatus) {
    throw status.id // TODO:
  }

  renderPoll(poll: Poll) {
    throw poll // TODO:
  }

  @Emit('mark')
  emitMark(status: IStatus, action: 'reblog' | 'favourite', callback: CallableFunction, undo = false): MarkMessage {
    return {
      id: status.id,
      type: (undo ? 'un' : '') + action,
      callback
    }
  }

  makeReblog(status: IStatus) {
    this.emitMark(status, 'reblog', () => {
      status.reblogs_count += (status.reblogged ? -1 : 1)
      status.reblogged = !status.reblogged
    }, status.reblogged)
  }

  makeFav(status: IStatus) {
    this.emitMark(status, 'favourite', () => {
      status.favourites_count += (status.favourited ? -1 : 1)
      status.favourited = !status.favourited
    }, status.favourited)
  }

}
</script>