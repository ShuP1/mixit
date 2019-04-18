<template lang="pug">
.openweathermap
  service-header(:emit="emit")
    template(#title) OpenWeatherMap
    template(#settings)
      setting-int(:id="'update'" :title="'Update interval'" :value="update" @change="saveOptionCouple")
      setting-int(:id="'forecastLimit'" :title="'Forecast limit'" :value="forecastLimit" @change="saveOptionCouple")
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
          input#token(v-model="newToken" required)
        p
          input(type="submit" value="Connect")
</template>

<script>
/* global axios */
import baseServiceVue from '../core/baseService.vue'
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
  extends: baseServiceVue,
  props: {
    token: {
      type: String,
      default: undefined
    },
    cities: {
      type: Array,
      default: function () {
        return []
      }
    },
    timeout: {
      default: 5000,
      type: Number
    },
    update: {
      default: 10 * 60, //10min
      type: Number
    },
    lang: {
      default: 'fr',
      type: String
    },
    forecastLimit: {
      default: 9,
      type: Number
    }
  },
  data() {
    return {
      rest: axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/',
        params: {
          appid: this.token, units: 'metric', lang: this.lang
        },
        timeout: this.timeout
      }),
      newToken: this.token,
      weathers: new Loadable(),
      forecast: new Loadable(),
      selectedId: 0,
      showAdd: this.cities.length == 0
    }
  },
  computed: {
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
    this.init()
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
            id: this.selected.id, cnt: this.forecastLimit
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
      this.cities.push({ id: id })
      this.saveOption('cities', this.cities)
    },
    removeCity(key) {
      Lists.removeAt(this.cities, key)
      this.saveOption('cities', this.cities)
    },
    init() {
      if(this.token) {
        if(this.cities.length > 0) {
          axios.all(this.cities.map(city => this.getWeather(city)))
            .then(axios.spread((...ress) =>
              this.weathers.success(ress.map(r => r.data))))
            .then(this.loadForecast)
            .catch(this.weathers.fail)

          if(this.update > 0)
            setInterval(this.updateData, this.update * 1000)
        } else this.weathers.success([])
      } else this.weathers.fail('First connection')
    },
    makeAuth() {
      this.catchEmit(axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: { q: 'London', appid: this.newToken },
        timeout: this.timeout
      })).then(() => {
        this.saveOption('token', this.newToken)
        this.init()
      })
    }
  }
}
</script>