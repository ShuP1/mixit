<template lang="pug">
.notification

  account(:account="notification.account" :bus="bus")
  a.date
    | {{ fromNow(notification.created_at) }}
    span(@click.stop.prevent="makeDismiss") {{ closeIcon }}

  span.colored.text-icon.letter {{ notificationTypeIcon }}

  .content
    template(v-if="notification.type == 'follow'") Vous suit
    status.reblog(v-else-if="notification.status" :status="notification.status"
      :withAccount="notification.type != 'mention'" :bus="bus")

</template>

<script lang="ts">
import { Component, Emit, Mixins, Prop } from 'vue-property-decorator'

import FromNowMixin from '@/components/FromNowMixin'
import Account from './Account.vue'
import BusMixin from './BusMixin'
import { Icons, Notification as NotificationIcons } from './Icons'
import Status from './Status.vue'
import { MarkStatus, Notification as INotification, PollVote, Status as IStatus } from './Types'

@Component({ components: { Account, Status } })
export default class Notification extends Mixins(FromNowMixin, BusMixin) {

  @Prop(Object)
  readonly notification!: INotification

  get notificationTypeIcon() {
    return NotificationIcons[this.notification.type] || '?'
  }

  get closeIcon() {
    return Icons.close
  }

  @Emit('dismiss')
  makeDismiss() {
    return this.notification.id
  }

}
</script>
