import { Component, Vue } from 'vue-property-decorator'
import { TimeModule } from '../store'

const times = new Map<string, number>([
  ['second', 1000],
  ['minute', 60],
  ['hour', 60],
  ['day', 24],
  ['month', 30.5],
  ['year', 12],
  ['century', 100]
])

@Component
export default class FromNowMixin extends Vue {

  protected static toNumber(date: Date | number | string) {
    return Number(new Date(date))
  }

  fromNow(date: Date | number | string) {
    const milliseconds = Math.floor(FromNowMixin.toNumber(TimeModule.now) - FromNowMixin.toNumber(date))

    let cur = 0
    let divider = 1
    let name = 'millisecond'
    for (const time of times) {
      divider *= time[1]
      const next = Math.floor(milliseconds / divider)
      if(next <= 0) {
        return `${cur} ${name}${cur > 1 ? 's' : ''}`
      }
      name = time[0]
      cur = next
    }
  }
}