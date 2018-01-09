export default {
  created() {
    forEachListener(this, (key, listener) => {
      document.addEventListener(key, listener)
    })
  },
  beforeDestroy() {
    forEachListener(this, (key, listener) => {
      document.removeEventListener(key, listener)
    })
  }
}

function forEachListener(vm, callback) {
  const events = vm.$options.events
  Object.keys(events).forEach(key => {
    callback(key, event => events[key].call(vm, event))
  })
}
