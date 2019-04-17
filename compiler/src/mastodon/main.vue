<template lang="pug">
.mastodon
  service-header(@move="passMove")
    template(#title)
      | Mastodon: 
      span(v-html="parseEmojis(account.display_name, account.emojis)")
      | {{ server ? '@' + server : '' }}
    template(#settings)
      setting-boolean(:id="'reconnect'" :title="'Reconnect'" :value="reconnect" @change="setOptionCouple")
      setting-boolean(:id="'reblog'" :title="'Show reblogs'" :value="reblog" @change="setOptionCouple")
      setting-boolean(:id="'reply'" :title="'Show replies'" :value="reply" @change="setOptionCouple")
      setting-int(:id="'buffer'" :title="'Buffer size'" :value="buffer" @change="setOptionCouple")
      setting-boolean(:id="'showMedia'" :title="'Show medias'" :value="showMedia" @change="setOptionCouple")
  client(v-if="server && token" v-bind="$props" @error="emitError")
  .auth(v-else)
    form(@submit.prevent="setServer")
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
import baseServiceVue from '../core/baseService.vue'

import { parseEmojisMixin } from './tools'
import clientVue from './client.vue'

export default { //TODO: Use oauth
  name: 'mastodon',
  extends: baseServiceVue,
  mixins: [ parseEmojisMixin ],
  components: {
    client: clientVue
  },
  props: {
    server: String,
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
      account: { display_name: 'Loading...', emojis: [] }
    };
  },
  methods: {
    setServer() {
      axios.get(`https://${this.newServer}/api/v1/accounts/verify_credentials`, {
        headers: { Authorization: "Bearer " + this.newToken },
        timeout: this.timeout
      }).then(() => this.saveOptions({...this.$props,
          server: this.newServer, token: this.newToken}))
        .catch(this.emitError)
    }
  },
  created() {
    if(this.server && this.token) {
      axios.get(`https://${this.server}/api/v1/accounts/verify_credentials`, {
        headers: { Authorization: "Bearer " + this.token },
        timeout: this.timeout
      }).then(res => this.account = res.data)
        .catch(err => {
          this.emitError(err)
          this.account.display_name = 'Failed'
        })
    } else{
      this.account.display_name = 'First connection'
    }
  }
}
</script>