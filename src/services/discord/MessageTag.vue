<template lang="pug">
.message
  span.account {{ message.author.username }}
  from-now.date.osef(:date="message.timestamp" :now="now")
  .content(v-html="content")
  a.embed(v-if="message.embeds" v-for="embed in message.embeds" :href="embed.url") {{ embed.title }}
  .react(v-if="message.reactions" v-for="react in message.reactions" :class="{ colored: react.me }")
    | {{ react.count }}x{{ react.emoji.name }}
    //emoji(:emoji="react.emoji")
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'

import ShowMediaMixin from '@/components/ShowMediaMixin'
import fromNow from '@/components/time/FromNow.vue'
import TimedMixin from '@/components/time/TimedMixin'
import { Message } from './Types'

const MAX_LENGTH = 20

@Component({
  components:{
    fromNow
  }
})
export default class MessageTag extends Mixins(ShowMediaMixin, TimedMixin) {

  @Prop(Object)
  readonly message!: Message

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

