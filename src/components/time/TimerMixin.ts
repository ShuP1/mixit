import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TimerMixin extends Vue {

  now = Date.now()

  created() {
    const self = this
    setInterval(() => {
      self.now = Date.now()
    }, 30 * 1000)
  }

}