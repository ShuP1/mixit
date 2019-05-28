<template lang="pug">
.notification
  account(:account="notification.account" :showMedia="showMedia")

  span.colored.text-icon.letter(v-if="notification.type == 'mention'") ✉
  span.colored.text-icon.letter(v-if="notification.type == 'reblog'") ⟳
  span.colored.text-icon.letter(v-if="notification.type == 'favourite'") ⚝

  span.date {{ fromNow(notification.created_at) }}

  .content
    template(v-if="notification.type == 'follow'") Vous suit
    status.reblog(v-else-if="notification.status" :status="notification.status"
      :showMedia="showMedia" :withAccount="notification.type != 'mention'" @mark="passMark" @vote="passVote")

  a.date(@click.stop.prevent="makeDismiss" style="margin-top: -1em") ❌
</template>

<script lang="ts">
import { Component, Emit, Mixins, Prop } from 'vue-property-decorator'

import FromNowMixin from '@/components/FromNowMixin'
import ShowMediaMixin from '@/components/ShowMediaMixin'
import Account from './Account.vue'
import Status from './Status.vue'
import { MarkStatus, Notification as INotification, PollVote } from './Types'

@Component({ components: { Account, Status } })
export default class Notification extends Mixins(ShowMediaMixin, FromNowMixin) {

  @Prop(Object)
  readonly notification!: INotification

  @Emit('dismiss')
  makeDismiss() {
    return this.notification.id
  }

  @Emit('mark')
  passMark(action: MarkStatus) {
    return action
  }

  @Emit('vote')
  passVote(action: PollVote) {
    return action
  }

}
</script>
