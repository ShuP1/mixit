<template lang="pug">
.openweathermap
  service-header(@move="passMove")
    template(#title) OpenWeatherMap
    template(#settings)
      setting-string(:id="'token'" :title="'Token'" :value="token" @change="setOptionCouple")
      setting-int(:id="'update'" :title="'Update interval'" :value="update" @change="setOptionCouple")
      setting-int(:id="'forecastLimit'" :title="'Forecast limit'" :value="forecastLimit" @change="setOptionCouple")
      p.setting
        button(@click="showAdd = true") Add city
  template(v-if="weathers.length > 0 || cities.length == 0")
    .list
      .weather(v-for="(city, id) in weathers" :class="{ selected: selected == id }" @click.stop.prevent="makeSelect(id)")
        .main(v-for="main in city.weather")
          p {{ main.description }}
          .ic
            img(:src="`https://openweathermap.org/img/w/${main.icon}.png`" :alt="main.main")
        span.remove(@click.stop.prevent="removeCity(id)") ❌
        .header
          | {{ city.name }}&nbsp;
          img.icon(:src="`https://openweathermap.org/images/flags/${city.sys.country.toLowerCase()}.png`" :alt="city.sys.country" :title="city.sys.country")
        .data
          | {{ city.main.temp }}°C ─ {{ city.main.humidity }}%
      input.weather(v-show="showAdd" placeholder="city id" @keyup.enter="addCity(parseInt($event.target.value))")
    .forecast
      chart.chart(v-if="forecast" :chartData="forecastChart")
      .service-loader(v-else)
  .service-loader(v-else)
</template>

<script>
import baseServiceVue from '../core/baseService.vue'

import chartVue from './chart.vue'

export default {
  name: 'openweathermap',
  extends: baseServiceVue,
  components: {
    chart: chartVue
  },
  props: {
    token: String,
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
      weathers: [],
      forecast: null,
      selected: 0,
      showAdd: this.cities.length == 0
    };
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
        data: this.forecast.map(function (line) { return {
          x: line.dt * 1000, y: line.main.temp
        } })
      },{
        type: 'bar',
        label: 'Percipitation',
        yAxisID: 'y-axis-rain',
        borderColor: '#DDDDDD',
        backgroundColor: '#DDDDDD33',
        borderWidth: 1,
        data: this.forecast.filter(f => 'rain' in f && '3h' in f.rain).map(function (line) { return {
          x: line.dt * 1000, y: line.rain['3h']
        } })
      }]
    } }
  },
  methods: {
    makeSelect(id) {
      this.selected = id
      this.forecast = null
      this.loadForecast()
    },
    updateData() {
      for (let i = 0; i < this.weathers.length; i++) {
        const weather = this.weathers[i];
        this.getWeather({ id: weather.id })
          .then(res => this.$set(this.weathers, i, res.data))
      }
      this.loadForecast()
    },
    getWeather(params) {
      return this.rest.get('weather', { params: params })
        .catch(this.emitError)
    },
    loadForecast() {
      if(this.weathers[this.selected]) {
        this.rest.get('forecast', { params: {
          id: this.weathers[this.selected].id,
          cnt: this.forecastLimit
        }})
          .then(res => this.forecast = res.data.list)
          .catch(this.emitError)
      }
    },
    formatDate(dt) {
       const date = new Date(dt * 1000)
       return `${date.toLocaleDateString()} ${date.getHours()}h`
    },
    addCity(id) {
      const options = {...this.$props}
      options.cities.push({id: id})
      this.saveOptions(options)
    },
    removeCity(i) {
      const options = {...this.$props}
      options.cities.splice(i, 1)
      this.saveOptions(options)
    }
  },
  created() {
    axios.all(
      this.cities.map(
        city => this.getWeather(city)
          .then(res => this.weathers.push(res.data))))
      .then(this.loadForecast)

    if(this.update > 0)
      setInterval(this.updateData, this.update * 1000)
  }
}
</script>