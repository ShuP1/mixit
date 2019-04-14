<template lang="pug">
.notification
  account(:account="notification.account")

  span.colored.text-icon.letter(v-if="notification.type == 'mention'") ✉
  span.colored.text-icon.letter(v-if="notification.type == 'reblog'") ⟳
  span.colored.text-icon.letter(v-if="notification.type == 'favourite'") ⚝

  from-now.date(:date="notification.created_at" :now="now")

  .content
    template(v-if="notification.type == 'follow'") Vous suit
    status.reblog(v-else-if="notification.status" :status="notification.status" :now="now"
      :withAccount="notification.type != 'mention'" @mark.stop.prevent="")

  a.date(@click.stop.prevent="makeDismiss" style="margin-top: -1em") ❌
</template>

<script>
import fromNowVue, { timedMixin } from '../core/fromNow.vue'
import accountVue from './account.vue'
import statusVue from './status.vue'

export default {
  props: ["notification"],
  mixins: [ timedMixin ],
  components: {
    fromNow: fromNowVue,
    account: accountVue,
    status: statusVue
  },
  methods: {
    makeDismiss() {
      this.$emit('dismiss', this.notification.id)
    }
  }
}
</script>
