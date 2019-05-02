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
        weather(v-for="(city, id) in weathers.get().data" :key="id" :class="{ selected: weathers.get().isSelected(id) }"
          :city="city" @select="makeSelect(id)" @remove="removeCity(id)")
        input.weather(v-show="showAdd" placeholder="city id" @keyup.enter="addCity(parseInt($event.target.value))")
      loadable-block.forecast(:loadable="forecast")
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

<script lang="ts">
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { Component } from 'vue-property-decorator'

import ConnectedService from '@/components/service/ConnectedService'
import ServiceHeaderVue from '@/components/ServiceHeader.vue'
import Lists from '@/helpers/lists/Lists'
import { Selectable } from '@/helpers/lists/Selectable'
import AxiosLoadable from '@/helpers/loadable/AxiosLoadable'
import { Auth } from '@/types/App'
import Chart from './Chart'
import WeatherVue, { IWeather } from './Weather.vue'

interface Forecast {
  dt: number
  main: {
    temp: number
  }
  rain?: {
    '3h': number
  }
}

const AUTH = { TOKEN: 'token' }

@Component({
  components: {
    'service-header': ServiceHeaderVue,
    weather: WeatherVue,
    chart: Chart
  }
})
export default class OpenWeatherMap extends ConnectedService<object, object> {

  rest!: AxiosInstance // NOTE: set in this.init()
  weathers = new AxiosLoadable<Selectable<IWeather>, object>()
  forecast = new AxiosLoadable<Forecast[], string>()
  showAdd = false

  get params() {
    return { cities: [] as Array<{ id: number }>, timeout: 5000, update: 10 * 60, lang: 'fr',
      forecastLimit: 9, ...this.options }
  }

  get isSetup() {
    return this.auth && this.auth.has(AUTH.TOKEN)
  }

  get serviceName() {
    return 'OpenWeatherMap'
  }

  get connector() {
    return this.weathers
  }

  get forecastChart() {
    return this.forecast.map<object>(fs => ({
      datasets: [{
        type: 'line',
        label: 'Temperature',
        yAxisID: 'y-axis-temp',
        borderColor: 'white',
        borderWidth: 1,
        fill: false,
        data: fs.map(line => ({
          x: line.dt * 1000, y: line.main.temp
        }))
      },{
        type: 'bar',
        label: 'Percipitation',
        yAxisID: 'y-axis-rain',
        borderColor: '#DDDDDD',
        backgroundColor: '#DDDDDD33',
        borderWidth: 1,
        data: fs.filter(f => 'rain' in f && '3h' in f.rain!).map(line => ({
          x: line.dt * 1000, y: line.rain!['3h']
        }))
      }]
    }), unescape)
  }

  get hasWeathers() {
    if(!this.weathers.isSuccess) {
      return false
    }

    const ws = this.weathers.get()
    if(ws){
      return ws.data.length > 0
    } else {
      return false
    }
  }

  created() {
    this.$watch('options.cities', this.init)
  }

  makeSelect(id: number) {
    this.weathers.with(w => w.select(id))
    this.loadForecast()
  }

  updateData() {
    this.weathers.with(w => Lists.for(w.data,
      (weather, i) => this.getWeather({ id: weather.id })
        .then(res => this.$set(w, i, res.data))
    ))
    this.loadForecast()
  }

  getWeather(params: { id: number }) {
    return this.catchEmit(this.rest.get('weather', { params }))
  }

  loadForecast() {
    const selected = this.weathers.map(w => w.selected, undefined)
    if(selected) {
      this.forecast.load<{ list: Forecast[] }>(
        this.catchEmit(this.rest.get('forecast', { params: {
          id: selected.id, cnt: this.params.forecastLimit
        }})),
        res => res.data.list
      )
    } else {
      this.forecast.fail('Any selection')
    }
  }

  formatDate(dt: number) {
    const date = new Date(dt * 1000)
    return `${date.toLocaleDateString()} ${date.getHours()}h`
  }

  addCity(id: number) {
    this.params.cities.push({ id })
    this.saveOption('cities', this.params.cities)
  }

  removeCity(key: number) {
    Lists.removeAt(this.params.cities, key)
    this.saveOption('cities', this.params.cities)
  }

  load() {
    this.rest = this.getRest(this.auth)
    this.showAdd = this.params.cities.length === 0

    if(this.params.cities.length > 0) {
      axios.all(this.params.cities.map(city => this.getWeather(city)))
        .then(axios.spread((...ress) =>
          this.weathers.success(new Selectable(ress.map(r => r.data)))))
        .then(this.loadForecast)
        .catch(this.weathers.fail)

      if(this.params.update > 0) {
        setInterval(this.updateData, this.params.update * 1000)
      }
    } else {
      this.weathers.success(new Selectable([]))
    }
  }

  checkAuth(auth: Auth) {
    return this.getRest(auth).get('/weather?q=London')
  }

  getRest(auth: Auth) {
    return axios.create({
      baseURL: 'https://api.openweathermap.org/data/2.5/',
      params: {
        appid: auth.get(AUTH.TOKEN), units: 'metric', lang: this.params.lang
      },
      timeout: this.params.timeout
    })
  }

}
</script>

<style lang="sass">
@import '@/common.sass'

.openweathermap
  .loadable-block
    overflow: hidden
    display: flex
    flex: 1
    flex-direction: column
  .list
    display: flex
    flex-wrap: wrap
    @include group-tile
  .weather
    flex: 1
  .forecast
    @include main-tile
    flex: 1
    overflow: hidden
    height: 100%
    .chart
      position: relative
      height: 100%
  .ic
    overflow: hidden
    height: 30px
    display: inline-block
    img
      margin-top: -10px
</style>
