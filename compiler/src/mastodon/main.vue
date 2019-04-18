<template lang="pug">
.mastodon
  service-header(:emit="emit")
    template(#title)
      | Mastodon: 
      loadable-inline(:loadable="account")
        template(#success)
          span(v-html="parseEmojis(account.data.display_name, account.data.emojis) + '@' + server")
    template(#settings)
      setting-boolean(:id="'reconnect'" :title="'Reconnect'" :value="reconnect" @change="saveOptionCouple")
      setting-boolean(:id="'reblog'" :title="'Show reblogs'" :value="reblog" @change="saveOptionCouple")
      setting-boolean(:id="'reply'" :title="'Show replies'" :value="reply" @change="saveOptionCouple")
      setting-int(:id="'buffer'" :title="'Buffer size'" :value="buffer" @change="saveOptionCouple")
      setting-boolean(:id="'showMedia'" :title="'Show medias'" :value="showMedia" @change="saveOptionCouple")
  loadable-block.service-content(:loadable="account")
    template(#success)
      client(v-bind="$props")
    template(#error)
      form(@submit.prevent="makeAuth")
        p
          label(for="server") Server:
          input#server(v-model="newServer" required)
        p
          label(for="token") Token:
          input#token(v-model="newToken" required)
        p
          input(type="submit" value="Connect")
</template>

<script>
/* global axios */
import baseServiceVue, { Loadable } from '../core/baseService.vue'

import { parseEmojisMixin } from './tools'
import clientVue from './client.vue'

export default { //TODO: Use oauth
  name: 'Mastodon',
  components: {
    client: clientVue
  },
  extends: baseServiceVue,
  mixins: [ parseEmojisMixin ],
  props: {
    server: {
      type: String,
      default: undefined
    },
    token: {
      type: String,
      default: undefined
    },
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
    reblog: {
      default: true,
      type: Boolean
    },
    reply: {
      default: false,
      type: Boolean
    },
    showMedia: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      newServer: this.server,
      newToken: this.token,
      account: new Loadable()
    }
  },
  created() {
    this.init()
  },
  methods: {
    getMe(server, token) {
      return this.catchEmit(axios.get(`https://${server}/api/v1/accounts/verify_credentials`, {
        headers: { Authorization: 'Bearer ' + token },
        timeout: this.timeout
      }))
    },
    init() {
      if(this.server && this.token) {
        this.account.load(
          this.getMe(this.server, this.token),
          res => res.data
        )
      } else {
        this.account.fail('First connection')
      }
    },
    makeAuth() {
      this.getMe(this.newServer, this.newToken)
        .then(() => {
          this.saveOptions({ ...this.$props,
            server: this.newServer, token: this.newToken })
          this.init()
        })
    }
  }
}
</script>