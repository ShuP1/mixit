<template lang="pug">
.message
  span.account {{ message.author.username }}
  span.date.osef {{ fromNow(message.timestamp) }}
  .content(v-html="content")
  a.embed(v-if="message.embeds" v-for="embed in message.embeds" :href="embed.url") {{ embed.title }}
  .react(v-if="message.reactions" v-for="react in message.reactions" :class="{ colored: react.me }")
    | {{ react.count }}x{{ react.emoji.name }}
    //emoji(:emoji="react.emoji")
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'

import FromNowMixin from '@/components/FromNowMixin'
import ShowMediaMixin from '@/components/ShowMediaMixin'
import { Message as IMessage } from './Types'

const MAX_LENGTH = 20

@Component
export default class Message extends Mixins(ShowMediaMixin, FromNowMixin) {

  @Prop(Object)
  readonly message!: IMessage

  get content() {
    let text = this.message.content.split('\n').join('<br />')
    for (const mention of this.message.mentions) {
      text = text.split(`<@${mention.id}>`).join(`<span.osef>@${mention.username}</span>`)
      text = text.split(`<@!${mention.id}>`).join(`<span.osef>@${mention.username}</span>`)
    }
    return text
  }

}
</script>

<style lang="sass" scoped>
.message
  .date
    float: right
  .content
    margin: .5em
</style>

