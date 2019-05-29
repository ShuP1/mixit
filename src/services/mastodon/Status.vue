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
        .poll(v-if="status.poll")
          .date {{ fromNow(status.poll.expires_at) }}
          form.options(@submit.prevent="makeVote(status, $event.target.elements)")
            .option(v-for="option in status.poll.options")
              input(v-if="!status.poll.expired && !status.poll.voted" :type="status.poll.multiple ? 'checkbox' : 'radio'" :id="status.poll.id + option.title" :value="option.title" :name="status.poll.id")
              label(:for="status.poll.id + option.title")
                | {{ option.title }}
                span.note {{ option.votes_count }}
            button(v-if="status.poll.voted") voted
            button(v-else-if="status.poll.expired") expired
            input(v-else type="submit" value="vote")
        a.media(v-for="media in status.media_attachments" :href="media.url" target="_blank")
          template(v-if="showMedia")
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
    status.reblog(v-else :status="status.reblog" :showMedia="showMedia" @mark="passMark" @vote="passVote" @context="passContext")

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
    a.visibility
      template(v-if="status.visibility == 'public'") ◍
      template(v-else-if="status.visibility == 'unlisted'") 👁
      template(v-else-if="status.visibility == 'private'") ⚿
      template(v-else-if="status.visibility == 'direct'") ✉
    a.fil(@click.stop.prevent="passContext(status)")
      span.text-icon ⮃
</template>

<script lang="ts">
import { Component, Emit, Mixins, Prop } from 'vue-property-decorator'

import FromNowMixin from '@/components/FromNowMixin'
import ShowMediaMixin from '@/components/ShowMediaMixin'
import Account from './Account.vue'
import { ParseEmojisMixin } from './ParseEmojisMixin'
import { Card, MarkStatus, MarkStatusType, Poll, PollVote, Status as IStatus } from './Types'

@Component({ components: { Account } })
export default class Status extends Mixins(ParseEmojisMixin, ShowMediaMixin, FromNowMixin) {

  @Prop(Object)
  readonly status!: IStatus

  @Prop({ type: Boolean, default: true })
  readonly withAccount!: boolean

  @Emit('mark')
  passMark(action: MarkStatus) {
    return action
  }

  @Emit('vote')
  passVote(action: PollVote) {
    return action
  }

  @Emit('context')
  passContext(status: IStatus) {
    return status
  }

  makeVote(status: IStatus, elements: HTMLInputElement[]) {
    const choices = Object.values(elements).filter(e => e.checked).map(e => e.value)
    if(choices.length > 0) {
      this.passVote({ id: status.id, poll: status.poll!.id, choices })
    }
  }

  makeMark(status: IStatus, action: string, undo: boolean) {
    this.passMark({
      id: status.id, type: (undo ? 'un' : '') + action as MarkStatusType
    })
  }

  makeReblog(status: IStatus) {
    this.makeMark(status, 'reblog', status.reblogged)
  }

  makeFav(status: IStatus) {
    this.makeMark(status, 'favourite', status.favourited)
  }

  makeReply(status: IStatus) {
    throw status.id // TODO:
  }

}
</script>