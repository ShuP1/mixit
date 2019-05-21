<template lang="pug">
.nextcloud-news(v-show="showService")
  service-header(:emit="emit")
    template(#title)
      | {{ serviceName }}
      span.note(v-if="hasNews")  ({{ news.get().length }})
    template(#settings)
      setting-int(:id="'update'" :title="'Update interval'" :value="params.update" @change="saveOptionCouple")
      setting-int(:id="'buffer'" :title="'Buffer size'" :value="params.buffer" @change="saveOptionCouple")
      setting-boolean(:id="'showEmpty'" :title="'Show empty'" :value="params.showEmpty" @change="saveOptionCouple")
  loadable-block.unreaded(:loadable="news")
    template(#success)
      .news(v-for="line in news.get()")
        a(:href="line.url" target="_blank")
          span.date {{ fromNow(line.pubDate * 1000) }}
        span.read(@click.stop="makeRead(line.id)") &#128065;
        span.title(@click.stop="line.open = !line.open") {{ line.author }} ─ {{ line.title }}
        .content(v-if="line.open && line.body") {{ line.body }}
    template(#error)
      form(@submit.prevent="makeAuth")
        p
          label(for="server") Server:
          input#server(v-model="newAuth.server" required)
        p
          label(for="username") Username:
          input#username(v-model="newAuth.username" required)
        p
          label(for="token") Token:
          input#token(v-model="newAuth.token" required)
        p
          input(type="submit" value="Connect")
</template>

<script lang="ts">
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { Component, Mixins } from 'vue-property-decorator'

import FromNowMixin from '@/components/FromNowMixin'
import ConnectedService from '@/components/service/ConnectedService'
import Lists from '@/helpers/lists/Lists'
import AxiosLoadable from '@/helpers/loadable/AxiosLoadable'
import { Auth } from '@/types/App'

interface News {
  id: number
  url: string
  pubDate: number
  author: string
  title: string
  body: string
  open: boolean
}

const AUTH = { SERVER: 'server', USERNAME: 'username', TOKEN: 'token' }

@Component
export default class NextcloudNews extends Mixins<ConnectedService<object, object>>(ConnectedService, FromNowMixin) { // TODO: handle unread

  rest!: AxiosInstance // NOTE: set in this.init()
  news = new AxiosLoadable<News[], object>()

  get params() {
    return { timeout: 5000, buffer: -1, update: 5 * 60, showEmpty: true, ...this.options }
  }

  get isSetup() {
    return this.auth && this.auth.has(AUTH.SERVER) && this.auth.has(AUTH.USERNAME) && this.auth.has(AUTH.TOKEN)
  }

  get connector() {
    return this.news
  }

  get serviceName() {
    return 'Nextcloud News'
  }

  get hasNews() {
    if(!this.news.isSuccess) {
      return false
    }

    const news = this.news.get()
    if(news){
      return news.length > 0
    } else {
      return false
    }
  }

  get showService() {
    return this.params.showEmpty || this.hasNews || !this.isSetup
  }

  loadData() {
    this.news.load<{ items: News[] }>(
      this.catchError(this.rest.get<News[]>('/items', { params: { batchSize: this.params.buffer, type: 3, getRead: false } })),
      res => res.data.items.map(n => {
        n.open = false
        return n
      })
    )
  }

  removeNews(id: number) {
    this.news.with(ns => Lists.removeFirstBy(ns, n => n.id, id))
  }

  makeRead(id: number) {
    this.catchError(this.rest.put(`/items/${id}/read`))
      .then(() => this.removeNews(id))
  }

  load() {
    this.rest = this.getRest(this.auth)

    this.loadData()

    if(this.params.update > 0) {
      setInterval(this.loadData, this.params.update * 1000)
    }
  }

  checkAuth(auth: Auth){
    return this.getRest(auth).get('/folders')
  }

  getRest(auth: Auth) {
    return axios.create({
      baseURL: `https://${auth.get(AUTH.SERVER)}/index.php/apps/news/api/v1-2/`,
      headers: { Authorization: 'Basic ' + btoa(auth.get(AUTH.USERNAME) + ':' + auth.get(AUTH.TOKEN)) },
      timeout: this.params.timeout
    })
  }

}
</script>

<style lang="sass">
@import '@/common.sass'

.nextcloud-news
  .unreaded
    overflow-y: auto
    @include group-tile
    .news
      .date
        float: right
      .read
        margin-right: .5em
      .content
        padding: $borderRadius
</style>
