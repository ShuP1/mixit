<script>
export default {
  props: {
    id: {
      type: String,
      default: undefined
    },
    title: {
      type: String,
      default: undefined
    }
  },
  methods: {
    sendChange(value) {
      this.$emit('change', { key: this.id, value: value })
    }
  }
}
</script>
