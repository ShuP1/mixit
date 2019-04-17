<script>
export default {
  props: {
    id: String,
    title: String
  },
  methods: {
    sendChange(value) {
      this.$emit('change', { key: this.id, value: value })
    }
  }
}
</script>
