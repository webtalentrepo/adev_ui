export default {
  name: 'portal',
  props: ['to', 'mountTo'],
  created () {},
  mounted () {
    this.$nextTick(this.setup)
  },
  updated () {
    this.sendUpdate()
  },
  methods: {
    sendUpdate () {
      console.log(`to: update:${this.to}`)
      portalBus.$emit(`update:${this.to}`, this.$slots.default)
    },
    setup () {
      if (this.mountTo) {
        var targetEl = document.getElementById(this.mountTo)
        // debugger
        if (!targetEl) {
          console.warn(`Target Element with id '${this.mountTo}' not found!`)
          return
        }

        var PortalTarget = this.$options.components.portalTarget
        var portalTarget = new PortalTarget({
          parent: this,
          propsData: { name: this.to }
        })
        portalTarget.$mount(targetEl)
        console.log(portalTarget)

        this.$nextTick(portalTarget.update(this.$slots.default))
      } else {
        this.$nextTick(this.sendUpdate)
      }
    }
  },
  render (h) {
    return h('div', {
      style: { display: 'none' },
      ref: 'portalWrapper'
    })
  }
}
