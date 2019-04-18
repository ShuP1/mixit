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
      this.emit('saveAll', options)
      this.$nextTick(function(){
        this.$forceUpdate()
      })
    },
    saveOption(key, value) {
      this.saveOptionCouple({
        key: key, value: value
      })
    },
    saveOptionCouple(couple) {
      this.emit('save', couple)
      this.$nextTick(function(){
        this.$forceUpdate()
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
