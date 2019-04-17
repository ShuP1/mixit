<script>
export default {
  props: {
    emit: Function
  },
  methods:{
    emitError(err) {
      this.emit('error', err)
    },
    saveOptions(options) {
      this.emit('saveAll', options)
    },
    saveOption(key, value) {
      this.saveOptionCouple({
        key: key, value: value
      })
    },
    saveOptionCouple(couple) {
      this.emit('save', couple)
    }
  }
}
</script>
