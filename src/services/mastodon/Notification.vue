<template lang="pug">
.notification
  account(:account="notification.account" :showMedia="showMedia")

  span.colored.text-icon.letter(v-if="notification.type == 'mention'") ✉
  span.colored.text-icon.letter(v-if="notification.type == 'reblog'") ⟳
  span.colored.text-icon.letter(v-if="notification.type == 'favourite'") ⚝

  from-now.date(:date="notification.created_at" :now="now")

  .content
    template(v-if="notification.type == 'follow'") Vous suit
    status.reblog(v-else-if="notification.status" :status="notification.status" :now="now"
      :showMedia="showMedia" :withAccount="notification.type != 'mention'" @mark="passMark")

  a.date(@click.stop.prevent="makeDismiss" style="margin-top: -1em") ❌
</template>

<script lang="ts">
import { Component, Emit, Mixins, Prop } from 'vue-property-decorator'

import ShowMediaMixin from '@/components/ShowMediaMixin'
import FromNowVue from '@/components/time/FromNow.vue'
import TimedMixin from '@/components/time/TimedMixin'
import AccountVue from './Account.vue'
import StatusVue from './Status.vue'
import { MarkMessage, Notification as INotification } from './Types'

@Component({
  components: {
    fromNow: FromNowVue,
    account: AccountVue,
    status: StatusVue
  }
})
export default class Notification extends Mixins(TimedMixin, ShowMediaMixin) {

  @Prop(Object)
  readonly notification!: INotification

  @Emit('dismiss')
  makeDismiss() {
    return this.notification.id
  }

  @Emit('mark')
  passMark(action: MarkMessage) {
    return action
  }

}
</script>
