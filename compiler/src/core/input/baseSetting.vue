<script>
export default {
  props: {
    id: String,
    title: String
  },
  methods: {
    sendChange(value) {
      this.$emit('change', { name: this.id, value: value })
    }
  }
}
</script>
