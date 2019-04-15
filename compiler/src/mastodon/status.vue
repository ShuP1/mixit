<template lang="pug">
div
  .status
    account(v-if="withAccount" :account="status.account" :showMedia="showMedia")

    span.text-icon.letter(v-if="status.reblog") ⟳

    a.date(target="_blank" :href="status.uri")
      from-now(:date="status.created_at" :now="now")

    .content
      template(v-if="!status.reblog")
        .spoiler(v-if="status.spoiler_text" @click.stop.prevent="status.sensitive = !status.sensitive").
          {{ status.spoiler_text || 'Spoiler' }} {{ status.sensitive ? '&rarr;' : '&darr;' }}
        div(v-if="!status.spoiler_text || !status.sensitive")
          .text(v-html="parseEmojis(status.content, status.emojis)")
          a.media(v-for="media in status.media_attachments" :href="media.url" target="_blank")
            template(v-if="showMedia")
              img(v-if="media.type == 'image' || media.type == 'gifv'" :src="media.preview_url" :alt="media.description" :title="media.description")
              .gif(v-if="media.type == 'gifv'") GIF
            template(v-else) Hidden media
      status.reblog(v-else :status="status.reblog" :now="now" :showMedia="showMedia")

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

<script>
import fromNowVue, { timedMixin } from '../core/fromNow.vue'
import { parseEmojisMixin } from './tools'
import accountVue from './account.vue'

export default {
  name: "status",
  mixins: [ timedMixin, parseEmojisMixin ],
  components: {
    account: accountVue,
    fromNow: fromNowVue
  },
  props: {
    status: Object,
    showMedia: {
      type: Boolean,
      default: true
    },
    withAccount: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    showReply(statusId) {
      console.error(statusId) //TODO:
    },
    makeReply(status) {
      console.error(status.id) //TODO:
    },
    emitMark(status, action, callback) {
      this.$emit('mark', {
        id: status.id,
        type: (status.reblogged ? 'un' : '') + action,
        callback: callback
      })
    },
    makeReblog(status) {
      this.emitMark(status, 'reblog', () => {
        status.reblogs_count += (status.reblogged ? -1 : 1)
        status.reblogged = !status.reblogged
      })
    },
    makeFav(status) {
      this.emitMark(status, 'favourite', () => {
        status.favourites_count += (status.favourited ? -1 : 1)
        status.favourited = !status.favourited
      })
    }
  }
}
</script>
