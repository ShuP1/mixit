<template lang="pug">
span {{ timeSince }}
</template>

<script>
export const timedMixin = {
  props: {
    now: {
      type: Number | Date,
      default: Date.now
    }
  }
}

export default {
  mixins: [ timedMixin ],
  props: [ 'date' ],
  computed: {
    timeSince() {
      var seconds = Math.floor((this.now - new Date(this.date)) / 1000);

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    }
  }
}

export const timerMinin = {
  created() {
    let self = this;
    setInterval(() => {
      self.now = Date.now()
    }, 30 * 1000)
  },
  data() {
    return {
      now: Date.now()
    }
  }
 }
</script>