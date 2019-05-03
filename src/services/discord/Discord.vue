<template lang="pug">
.discord
  service-header(:emit="emit")
    template(#title) {{ serviceName }}: {{ account.display }}
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

<script lang="ts">
import axios, { AxiosResponse } from 'axios'
import { Component, Mixins } from 'vue-property-decorator'

import AccountService from '@/components/service/AccountService'
import { Auth } from '@/types/App'
import Client from './Client.vue'
import { Options, User } from './Types'

export const AUTH = { TOKEN: 'token' }
export const CDN = 'https://cdn.discordapp.com'
export function getRest(auth: Auth, timeout: number) {
  return axios.create({
    baseURL: 'https://discordapp.com/api/', timeout,
    headers: { Authorization: auth.get(AUTH.TOKEN) }
  })
}

@Component({ components: { Client } })
export default class Discord extends Mixins<AccountService<string, object, User>>(AccountService) { // TODO: Use oauth

  get params(): Options {
    return { timeout: 5000, reconnect: false, buffer: 20, showMedia: true, ...this.options }
  }

  get isSetup() {
    return this.auth && this.auth.has(AUTH.TOKEN)
  }

  get serviceName() {
    return 'Discord'
  }

  getAccount(auth: Auth) {
    return getRest(auth, this.params.timeout).get('/users/@me')
  }

  mapAccount(res: AxiosResponse<User>) {
    return res.data.username
  }
}
</script>