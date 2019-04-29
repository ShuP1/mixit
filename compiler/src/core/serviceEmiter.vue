<script>
export default {
  props: {
    emit: {
      type: Function,
      default: undefined
    }
  },
  methods:{
    emitError(err) {
      this.emit('error', err)
    },
    saveOptions(options) {
      this.emit('saveOptions', options)
    },
    saveOption(key, value) {
      this.saveOptionCouple({
        key: key, value: value
      })
    },
    saveOptionCouple(couple) {
      this.emit('saveOption', couple)
    },
    saveService(name, auth) {
      this.emit('saveService', {
        name: name, auth: auth
      })
    },
    catchEmit(req) {
      return req.catch(err => {
        this.emitError(err)
        throw err
      })
    }
  }
}
</script>
