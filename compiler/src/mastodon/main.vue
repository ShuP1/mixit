<template lang="pug">
.mastodon
  .header(@click="showSettings = !showSettings")
    | Mastodon: 
    span(v-html="parseEmojis(account.display_name, account.emojis)")
    | @{{ server }}
  .settings(v-show="showSettings")
    p
      label(for="reconnect") Reconnect:
      input#reconnect(type="checkbox" :checked="reconnect" @change="setOption('reconnect', $event.target.checked)")
    p
      label(for="reblog") Show reblogs:
      input#reblog(type="checkbox" :checked="reblog" @change="setOption('reblog', $event.target.checked)")
    p
      label(for="reply") Show replies:
      input#reply(type="checkbox" :checked="reply" @change="setOption('reply', $event.target.checked)")
    p
      label(for="buffer") Buffer:
      input#buffer(type="number" :value="buffer" @keyup.enter="setOption('buffer', parseInt($event.target.value))")
  client(v-if="server && token" v-bind="$props")
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
import { emitErrorMixin, saveOptionsMixin } from '../core/tools'
import { parseEmojisMixin } from './tools'
import clientVue from './client.vue'

export default { //TODO: Use oauth
  name: 'mastodon',
  mixins: [ emitErrorMixin, saveOptionsMixin, parseEmojisMixin ],
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
    }
  },
  data() {
    return {
      newServer: this.server,
      newToken: this.token,
      showSettings: false,
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
    },
    setOption(name, value) {
      const options = {...this.$props}
      options[name] = value
      this.saveOptions(options)
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