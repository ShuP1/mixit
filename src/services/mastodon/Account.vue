<template lang="pug">
a.account(target="_blank" :href="account.url")
  .avatar(v-if="showMedia" :style="avatarStyle(account.avatar_static)")
  .name(v-html="parseEmojis(account.display_name, account.emojis, showMedia)")
  .acct @{{ account.acct }}
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'

import BusMixin from './BusMixin'
import { ParseEmojisMixin } from './ParseEmojisMixin'
import { Account as IAccount } from './Types'

@Component
export default class Account extends Mixins(ParseEmojisMixin, BusMixin) {

  @Prop(Object)
  readonly account!: IAccount

  get showMedia() {
    return this.bus.showMedia
  }

  avatarStyle(avatar: string) {
    return {
      'background-image': `url(${avatar})`
    }
  }

}
</script>
