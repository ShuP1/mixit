<template lang="pug">
a.account(target="_blank" :href="account.url")
  .avatar(:style="avatarStyle(account.avatar_static)")
  .name(v-html="parseEmojis(account.display_name, account.emojis)")
  .acct @{{ account.acct }}
</template>

<script>
import { parseEmojisMixin } from './tools'

export default {
  props: ["account"],
  mixins: [ parseEmojisMixin ],
  methods: {
    avatarStyle(avatar) {
      return {
        "background-image": `url(${avatar})`
      };
    }
  }
}
</script>
