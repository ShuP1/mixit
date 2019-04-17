<template lang="pug">
.weather(:class="{ selected: selected }" @click.stop.prevent="$emit('select')")
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

<script>
export default {
  props: {
    city: Object,
    selected: Boolean
  }
}
</script>
