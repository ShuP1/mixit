<template lang="pug">
a.account(target="_blank" :href="account.url")
  .avatar(v-if="showMedia" :style="avatarStyle(account.avatar_static)")
  .name(v-html="parseEmojis(account.display_name, account.emojis)")
  .acct @{{ account.acct }}
</template>

<script>
import { parseEmojisMixin } from './tools'

export default {
  mixins: [ parseEmojisMixin ],
  props: {
    account: {
      type: Object,
      default: undefined
    },
    showMedia: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    avatarStyle(avatar) {
      return {
        'background-image': `url(${avatar})`
      }
    }
  }
}
</script>
