<template lang="pug">
.discord
  service-header(:emit="emit")
    template(#title) {{ serviceName }}: {{ account.display() }}
    template(#settings)
      setting-boolean(:id="'reconnect'" :title="'Reconnect'" :value="params.reconnect" @change="saveOptionCouple")
      setting-int(:id="'buffer'" :title="'Buffer size'" :value="params.buffer" @change="saveOptionCouple")
      setting-boolean(:id="'showMedia'" :title="'Show medias'" :value="params.showMedia" @change="saveOptionCouple")
  loadable-block.service-content(:loadable="account")
    template(#success)
      client(:auth="auth" :options="params" :emit="emit")
    template(#error)
      form(@submit.prevent="makeAuth")
        p
          label(for="token") Token:
          input#token(v-model="newAuth.token" required)
        p
          input(type="submit" value="Connect")
</template>

<script>
/* global axios */
import accountServiceVue from '../core/accountService.vue'

import clientVue from './client.vue'

export default { //TODO: Use oauth
  name: 'Discord',
  components: { client: clientVue },
  extends: accountServiceVue,
  computed: {
    params() {
      return { timeout: 5000, reconnect: false, buffer: 20, showMedia: true, ...this.options }
    },
    isSetup() {
      return this.auth && this.auth.token
    },
    serviceName() {
      return 'Discord'
    }
  },
  methods: {
    getAccount({ token }) {
      return axios.get('https://discordapp.com/api/users/@me', {
        headers: { Authorization: token },
        timeout: this.params.timeout
      })
    },
    mapAccount(res) {
      return res.data.username
    }
  }
}
</script>