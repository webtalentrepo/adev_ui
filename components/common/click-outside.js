export default {
  name: 'click-outside',
  abstract: true,
  props: {
    handler: {
      type: Function,
      required: true
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside, true)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside, true)
  },
  methods: {
    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.handler(e)
      }
    }
  },
  render() {
    return this.$slots.default && this.$slots.default[0]
  }
}
