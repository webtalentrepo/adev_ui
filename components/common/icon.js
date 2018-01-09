let Icon = {
  functional: true,
  name: 'Icon',
  props: ['id'],
  render: function (h, c) {
    return h('svg', { staticClass: "ui-icon" }, [h('use', { attrs: { "xlink:href": `ICON_SPRITE_PATH#${c.props.id}` } })])
  }
}

export default Icon
