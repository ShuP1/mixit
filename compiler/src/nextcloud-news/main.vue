<template lang="pug">
.nextcloud-news(v-show="showEmpty || unreaded.length > 0 || !server || !token || !username")
  service-header
    template(#title) Nextcloud News
    template(#settings)
      setting-int(:id="'update'" :title="'Update interval'" :value="update" @change="setOptionCouple")
      setting-int(:id="'buffer'" :title="'Buffer size'" :value="buffer" @change="setOptionCouple")
      setting-boolean(:id="'showEmpty'" :title="'Show empty'" :value="showEmpty" @change="setOptionCouple")
  .unreaded
    .news(v-for="news in unreaded")
      a(:href="news.url" target="_blank")
        from-now.date(:date="news.pubDate * 1000" :now="now")
      span.read(@click.stop="makeRead(news.id)") &#128065;
      span.title(@click.stop="news.open = !news.open") {{ news.author }} ─ {{ news.title }}
      .content(v-if="news.open && news.body") {{ news.body }}
  .auth(v-if="!server")
    form(@submit.prevent="setServer")
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
import baseServiceVue from '../core/baseService.vue'
import fromNowVue, { timerMinin } from '../core/fromNow.vue'

export default {
  name: 'nextcloud-news',
  extends: baseServiceVue,
  mixins: [ timerMinin ],
  components: {
    fromNow: fromNowVue
  },
  props: {
    server: String,
    username: String,
    token: String,
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
      unreaded: [],
      now: Date.now(),
      newServer: this.server,
      newUsername: this.username,
      newToken: this.token,
    };
  },
  methods: {
    loadData() {
      this.rest.get("/items", { params: { batchSize: this.buffer, type: 3, getRead: false } })
        .then(res => this.unreaded = res.data.items.map(n => {
          n.open = false
          return n
        }))
        .catch(this.emitError)
    },
    removeNews(id) {
      for (var i = this.unreaded.length - 1; i >= 0; i--) {
        if (this.unreaded[i].id === id) {
          this.unreaded.splice(i, 1)
          break
        }
      }
    },
    makeRead(id) {
      this.rest.put(`/items/${id}/read`)
        .then(() => this.removeNews(id))
        .catch(this.emitError)
    },
    setServer() {
      axios.get(`https://${this.newServer}/index.php/apps/news/api/v1-2/folders`, {
        headers: { Authorization: 'Basic ' + btoa(this.newUsername + ':' + this.newToken) },
        timeout: this.timeout
      }).then(() => this.saveOptions({...this.$props,
          server: this.newServer, token: this.newToken, username: this.newUsername }))
        .catch(this.emitError)
    }
  },
  created() {
    if(this.server) {
      this.loadData()

      if(this.update > 0)
        setInterval(this.loadData, this.update * 1000)
      }
  }
}
</script>