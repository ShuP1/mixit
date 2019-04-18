<template lang="pug">
.nextcloud-news(v-show="showEmpty || hasNews || !isSetup")
  service-header(:emit="emit")
    template(#title)
      | Nextcloud News
      span.note(v-if="hasNews")  ({{ news.get().length }})
    template(#settings)
      setting-int(:id="'update'" :title="'Update interval'" :value="update" @change="saveOptionCouple")
      setting-int(:id="'buffer'" :title="'Buffer size'" :value="buffer" @change="saveOptionCouple")
      setting-boolean(:id="'showEmpty'" :title="'Show empty'" :value="showEmpty" @change="saveOptionCouple")
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
          input#server(v-model="newServer" required)
        p
          label(for="username") Username:
          input#username(v-model="newUsername" required)
        p
          label(for="token") Token:
          input#token(v-model="newToken" required)
        p
          input(type="submit" value="Connect")
</template>

<script>
/* global axios */
import baseServiceVue from '../core/baseService.vue'
import fromNowVue, { timerMinin } from '../core/fromNow.vue'

import Loadable from '../core/loadable/Loadable'
import Lists from '../core/Lists'

export default {
  name: 'NextcloudNews',
  components: {
    fromNow: fromNowVue
  },
  extends: baseServiceVue,
  mixins: [ timerMinin ],
  props: {
    server: {
      type: String,
      default: undefined
    },
    username: {
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
    buffer : {
      default: -1,
      type: Number
    },
    update: {
      default: 5 * 60, //5min
      type: Number
    },
    showEmpty: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      rest: axios.create({
        baseURL: `https://${this.server}/index.php/apps/news/api/v1-2/`,
        timeout: this.timeout,
        headers: {
          Authorization: 'Basic ' + btoa(this.username + ':' + this.token)
        }
      }),
      news: new Loadable(),
      newServer: this.server,
      newUsername: this.username,
      newToken: this.token,
    }
  },
  computed: {
    hasNews() {
      return this.news.isSuccess() && this.news.get().length > 0
    },
    isSetup() {
      return this.server && this.username && this.token
    }
  },
  created() {
    this.init()
  },
  methods: {
    loadData() {
      this.news.load(
        this.catchEmit(this.rest.get('/items', { params: { batchSize: this.buffer, type: 3, getRead: false } })),
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
    init() {
      if(this.isSetup) {
        this.loadData()

        if(this.update > 0)
          setInterval(this.loadData, this.update * 1000)
      }else this.news.fail('First connection')
    },
    makeAuth() {
      this.catchEmit(axios.get(`https://${this.newServer}/index.php/apps/news/api/v1-2/folders`, {
        headers: { Authorization: 'Basic ' + btoa(this.newUsername + ':' + this.newToken) },
        timeout: this.timeout
      })).then(() => {
        this.saveOptions({ ...this.$props,
          server: this.newServer, token: this.newToken, username: this.newUsername })
        this.init()
      })
    }
  }
}
</script>