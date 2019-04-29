<template lang="pug">
.openweathermap
  service-header(:emit="emit")
    template(#title) {{ serviceName }}
    template(#settings)
      setting-int(:id="'update'" :title="'Update interval'" :value="params.update" @change="saveOptionCouple")
      setting-int(:id="'forecastLimit'" :title="'Forecast limit'" :value="params.forecastLimit" @change="saveOptionCouple")
      p.setting
        button(@click="showAdd = true") Add city
  loadable-block(:loadable="weathers")
    template(#success)
      .list
        weather(v-for="(city, id) in weathers.get()" :key="id" :selected="selectedId == id"
          :city="city" @select="makeSelect(id)" @remove="removeCity(id)")
        input.weather(v-show="showAdd" placeholder="city id" @keyup.enter="addCity(parseInt($event.target.value))")
      loadable-block(:loadable="forecast").forecast
        template(#success)
          chart.chart(:chartData="forecastChart")
    template(#error)
      form(@submit.prevent="makeAuth")
        p
          label(for="token") Token:
          input#token(v-model="newAuth.token" required)
        p
          input(type="submit" value="Connect")
</template>

<script>
/* global axios */
import connectedServiceVue from '../core/connectedService.vue'
import Lists from '../core/Lists.js'
import Loadable from '../core/loadable/Loadable'

import chartVue from './chart.vue'
import weatherVue from './weather.vue'

export default {
  name: 'Openweathermap',
  components: {
    weather: weatherVue,
    chart: chartVue
  },
  extends: connectedServiceVue,
  data() {
    return {
      rest: undefined, //NOTE: set in this.init()
      weathers: new Loadable(),
      forecast: new Loadable(),
      selectedId: 0,
      showAdd: false
    }
  },
  computed: {
    params() {
      return { cities: [], timeout: 5000, update: 10 * 60, lang: 'fr',
        forecastLimit: 9, ...this.options }
    },
    isSetup() {
      return this.auth && this.auth.token
    },
    serviceName() {
      return 'OpenWeatherMap'
    },
    connector() {
      return this.weathers
    },
    forecastChart() { return {
      datasets: [{
        type: 'line',
        label: 'Temperature',
        yAxisID: 'y-axis-temp',
        borderColor: 'white',
        borderWidth: 1,
        fill: false,
        data: this.forecast.get().map(function (line) { return {
          x: line.dt * 1000, y: line.main.temp
        } })
      },{
        type: 'bar',
        label: 'Percipitation',
        yAxisID: 'y-axis-rain',
        borderColor: '#DDDDDD',
        backgroundColor: '#DDDDDD33',
        borderWidth: 1,
        data: this.forecast.get().filter(f => 'rain' in f && '3h' in f.rain).map(function (line) { return {
          x: line.dt * 1000, y: line.rain['3h']
        } })
      }]
    } },
    selected() {
      return this.weathers.isSuccess() ? this.weathers.get()[this.selectedId] : null
    },
    hasWeathers() {
      return this.weathers.isSuccess() && this.weathers.get().length > 0
    }
  },
  created() {
    this.$watch('options.cities', this.init)
  },
  methods: {
    makeSelect(id) {
      this.selectedId = id
      this.loadForecast()
    },
    updateData() {
      Lists.for(this.weathers.get(),
        (weather, i) => this.getWeather({ id: weather.id })
          .then(res => this.$set(this.weathers.get(), i, res.data))
      )
      this.loadForecast()
    },
    getWeather(params) {
      return this.catchEmit(this.rest.get('weather', { params: params }))
    },
    loadForecast() {
      if(this.selected) {
        this.forecast.load(
          this.catchEmit(this.rest.get('forecast', { params: {
            id: this.selected.id, cnt: this.params.forecastLimit
          }})),
          res => res.data.list
        )
      } else this.forecast.fail('Any selection')
    },
    formatDate(dt) {
      const date = new Date(dt * 1000)
      return `${date.toLocaleDateString()} ${date.getHours()}h`
    },
    addCity(id) {
      this.params.cities.push({ id: id })
      this.saveOption('cities', this.params.cities)
    },
    removeCity(key) {
      Lists.removeAt(this.params.cities, key)
      this.saveOption('cities', this.params.cities)
    },
    load() {
      this.rest = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/',
        params: {
          appid: this.auth.token, units: 'metric', lang: this.params.lang
        },
        timeout: this.params.timeout
      }) //NOTE: required by this.params
      this.showAdd = this.params.cities.length == 0

      if(this.params.cities.length > 0) {
        axios.all(this.params.cities.map(city => this.getWeather(city)))
          .then(axios.spread((...ress) =>
            this.weathers.success(ress.map(r => r.data))))
          .then(this.loadForecast)
          .catch(this.weathers.fail)

        if(this.update > 0)
          setInterval(this.updateData, this.params.update * 1000)
      } else this.weathers.success([])
    },
    checkAuth({ token }) {
      return axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: { q: 'London', appid: token },
        timeout: this.params.timeout
      })
    }
  }
}
</script>