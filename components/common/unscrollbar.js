export default {
  name: 'unscrollbar',
  render (h) {
    return h('div', { staticClass: 'unscrollbar-wrapper' }, [
      h('div', { staticClass: 'unscrollbar-content' }, this.$slots.default)
    ])
  }
}
