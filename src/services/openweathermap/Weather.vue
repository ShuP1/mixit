<template lang="pug">
.weather(@click.stop.prevent="$emit('select')")
  .main(v-for="main in city.weather")
    p {{ main.description }}
    .ic
      img(:src="`https://openweathermap.org/img/w/${main.icon}.png`" :alt="main.main")
  span.remove(@click.stop.prevent="$emit('remove')") ❌
  .header
    | {{ city.name }}&nbsp;
    img.icon(:src="`https://openweathermap.org/images/flags/${city.sys.country.toLowerCase()}.png`" :alt="city.sys.country" :title="city.sys.country")
  .data
    | {{ city.main.temp }}°C ─ {{ city.main.humidity }}%
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface IWeather {
  id: number
  main: {
    temp: number
    humidity: number
  }
  weather: Array<{
    description: string
    icon: string
    main: string
  }>
  name: string
  sys: {
    country: string
  }
}

@Component
export default class Weather extends Vue {

  @Prop(Object)
  readonly city!: IWeather

}
</script>

<style lang="sass">
@import '@/common.sass'

.weather
  min-width: 17em
  border: 1px solid $tileColor
  display: grid
  grid-template-columns: auto auto
  grid-template-rows: 1.2em auto
  grid-template-areas: "header main" "data remove"
  .header
    grid-area: header
    font-size: 1.2em
  .data
    grid-area: data
    margin-top: .5em
  .main
    grid-area: main
    justify-self: right
    p
      margin: $borderRadius
      display: inline
      vertical-align: top
  .remove
    grid-area: remove
    justify-self: right
    align-self: end
    font-size: .8em
</style>

