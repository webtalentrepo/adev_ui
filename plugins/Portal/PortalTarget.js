export default {
	name: 'portalTarget',
  props: ['name'],
  created() {
  	this.passengers = null
  	portalBus.$on(`update:${this.name}`, this.update)
  },
  beforeDestroy() {
  	portalBus.$off(`update:${this.name}`, this.update)
  },
  methods: {
  	update(passengers) {
    	console.log(`received: udpate:${this.name}`, this)
    	this.passengers = passengers ? passengers : null
      this.$forceUpdate()
    }
  },
  render(h) {
  	var children = this.passengers ? this.passengers : null
  	return h('div', {
    	class: { 'portal-target': true }
    }, children)
  }
}
