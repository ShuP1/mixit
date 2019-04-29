<template lang="pug">
.mastodon
  service-header(:emit="emit")
    template(#title)
      | {{ serviceName }}: 
      loadable-inline(:loadable="account")
        template(#success)
          span(v-html="parseEmojis(account.data.display_name, account.data.emojis) + '@' + auth.server")
    template(#settings)
      setting-boolean(:id="'reconnect'" :title="'Reconnect'" :value="params.reconnect" @change="saveOptionCouple")
      setting-boolean(:id="'reblog'" :title="'Show reblogs'" :value="params.reblog" @change="saveOptionCouple")
      setting-boolean(:id="'reply'" :title="'Show replies'" :value="params.reply" @change="saveOptionCouple")
      setting-int(:id="'buffer'" :title="'Buffer size'" :value="params.buffer" @change="saveOptionCouple")
      setting-boolean(:id="'showMedia'" :title="'Show medias'" :value="params.showMedia" @change="saveOptionCouple")
  loadable-block.service-content(:loadable="account")
    template(#success)
      client(:auth="auth" :options="params" :emit="emit")
    template(#error)
      form(@submit.prevent="makeAuth")
        p
          label(for="server") Server:
          input#server(v-model="newAuth.server" required)
        p
          label(for="token") Token:
          input#token(v-model="newAuth.token" required)
        p
          input(type="submit" value="Connect")
</template>

<script>
/* global axios */
import accountServiceVue from '../core/accountService.vue'

import { parseEmojisMixin } from './tools'
import clientVue from './client.vue'

export default { //TODO: Use oauth
  name: 'Mastodon',
  components: { client: clientVue },
  extends: accountServiceVue,
  mixins: [ parseEmojisMixin ],
  computed: {
    params() {
      return { timeout: 5000, reconnect: false, buffer: 20, reblog: true, reply: false,
        showMedia: true, ...this.options }
    },
    isSetup() {
      return this.auth && this.auth.server && this.auth.token
    },
    serviceName() {
      return 'Mastodon'
    }
  },
  methods: {
    getAccount({ server, token }) {
      return axios.get(`https://${server}/api/v1/accounts/verify_credentials`, {
        headers: { Authorization: 'Bearer ' + token },
        timeout: this.params.timeout
      })
    },
    mapServiceName(res, { server }) {
      return `${this.serviceName} ${this.mapAccount(res).acct}@${server}`
    }
  }
}
</script>