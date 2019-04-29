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
          from-now.date(:date="line.pubDate * 1000" :now="now")
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

<script>
/* global axios */
import connectedServiceVue from '../core/connectedService.vue'
import fromNowVue, { timerMinin } from '../core/fromNow.vue'

import Loadable from '../core/loadable/Loadable'
import Lists from '../core/Lists'

export default {
  name: 'NextcloudNews',
  components: {
    fromNow: fromNowVue
  },
  extends: connectedServiceVue,
  mixins: [ timerMinin ],
  data() {
    return {
      rest: undefined, //NOTE: set in this.init()
      news: new Loadable()
    }
  },
  computed: {
    params() {
      return { timeout: 5000, buffer: -1, update: 5 * 60, showEmpty: true, ...this.options }
    },
    isSetup() {
      return this.auth && this.auth.server && this.auth.username && this.auth.token
    },
    connector() {
      return this.news
    },
    serviceName() {
      return 'Nextcloud News'
    },
    hasNews() {
      return this.news.isSuccess() && this.news.get().length > 0
    },
    showService() {
      return this.params.showEmpty || this.hasNews || !this.isSetup
    }
  },
  methods: {
    loadData() {
      this.news.load(
        this.catchEmit(this.rest.get('/items', { params: { batchSize: this.params.buffer, type: 3, getRead: false } })),
        res => res.data.items.map(n => {
          n.open = false
          return n
        })
      )
    },
    removeNews(id) {
      Lists.removeFirst(this.news.get(), n => n.id === id)
    },
    makeRead(id) {
      this.catchEmit(this.rest.put(`/items/${id}/read`))
        .then(() => this.removeNews(id))
    },
    load() {
      this.rest = axios.create({
        baseURL: `https://${this.auth.server}/index.php/apps/news/api/v1-2/`,
        timeout: this.params.timeout,
        headers: {
          Authorization: 'Basic ' + btoa(this.auth.username + ':' + this.auth.token)
        }
      }) //NOTE: required by this.params

      this.loadData()

      if(this.params.update > 0)
        setInterval(this.loadData, this.params.update * 1000)
    },
    checkAuth({ server, username, token }){
      return axios.get(`https://${server}/index.php/apps/news/api/v1-2/folders`, {
        headers: { Authorization: 'Basic ' + btoa(username + ':' + token) },
        timeout: this.params.timeout
      })
    }
  }
}
</script>