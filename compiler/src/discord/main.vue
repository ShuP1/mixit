<template lang="pug">
.discord
  service-header(:emit="emit")
    template(#title) Discord: {{ account.display() }}
    template(#settings)
      setting-boolean(:id="'reconnect'" :title="'Reconnect'" :value="reconnect" @change="saveOptionCouple")
      setting-int(:id="'buffer'" :title="'Buffer size'" :value="buffer" @change="saveOptionCouple")
      setting-boolean(:id="'showMedia'" :title="'Show medias'" :value="showMedia" @change="saveOptionCouple")
  loadable-block.service-content(:loadable="account")
    template(#success)
      client(v-bind="$props")
    template(#error)
      form(@submit.prevent="makeAuth")
        p
          label(for="token") Token:
          input#token(v-model="newToken" required)
        p
          input(type="submit" value="Connect")
</template>

<script>
import baseServiceVue, { Loadable } from '../core/baseService.vue'

import clientVue from './client.vue'

export default { //TODO: Use oauth
  name: 'discord',
  extends: baseServiceVue,
  components: {
    client: clientVue
  },
  props: {
    token: String,
    timeout: {
      default: 5000,
      type: Number
    },
    reconnect: {
      default: false,
      type: Boolean
    },
    buffer: {
      default: 20,
      type: Number
    },
    showMedia: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      valid: false,
      newToken: this.token,
      account: new Loadable()
    }
  },
  methods: {
    getMe(token) {
      return this.catchEmit(axios.get('https://discordapp.com/api/users/@me', {
        headers: { Authorization: token },
        timeout: this.timeout
      }))
    },
    init() {
      if(this.token) {
        this.account.load(
          this.getMe(this.token),
          res => res.data.username
        )
      } else {
        this.account.fail('First connection')
      }
    },
    makeAuth() {
      this.getMe(this.newToken)
        .then(() => this.saveOption('token', this.newToken))
    }
  },
  created() {
    this.init()
  }
}
</script>