<template lang="pug">
.mastodon
  service-header(:emit="emit")
    template(#title)
      | {{ serviceName }}: 
      loadable-inline(:loadable="account")
        template(#success)
          span(v-html="parseEmojis(account.data.display_name, account.data.emojis) + '@' + server", params.showMedia)
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

<script lang="ts">
import axios, { AxiosResponse } from 'axios'
import { Component, Mixins } from 'vue-property-decorator'

import AccountService from '@/components/service/AccountService'
import { Auth } from '@/types/App'
import Client from './Client.vue'
import { ParseEmojisMixin } from './ParseEmojisMixin'
import { Account, Options } from './Types'

export const AUTH = { SERVER: 'server', TOKEN: 'token' }
export function getHeaders(auth: Auth) {
  return { headers: { Authorization: 'Bearer ' + auth.get(AUTH.TOKEN) } }
}
export function getRest(auth: Auth, timeout: number) {
  return axios.create({
    baseURL: `https://${auth.get(AUTH.SERVER)}/api/v1/`, timeout,
    ...getHeaders(auth)
  })
}

@Component({ components: { Client } })
export default class Mastodon extends Mixins<AccountService<Account, object>>(AccountService, ParseEmojisMixin) { // TODO: Use oauth

  get server() {
    return this.auth.get(AUTH.SERVER)
  }

  get params(): Options {
    return { timeout: 5000, reconnect: false, buffer: 20, reblog: true, reply: false,
      showMedia: true, ...this.options }
  }

  get isSetup() {
    return this.auth && this.auth.has(AUTH.SERVER) && this.auth.has(AUTH.TOKEN)
  }

  get serviceName() {
    return 'Mastodon'
  }

  getAccount(auth: Auth) {
    return getRest(auth, this.params.timeout)
      .get<Account>('/accounts/verify_credentials')
  }

  mapServiceName(res: AxiosResponse<Account>, newAuth: Auth) {
    return `${this.serviceName} ${this.mapAccount(res).acct}@${newAuth.get(AUTH.SERVER)}`
  }
}
</script>
