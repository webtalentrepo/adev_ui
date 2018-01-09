import Toast from './Toast.vue'
import Toaster from './Toaster.vue'

export default {
  install: function (Vue, options = { maxToasts: 5 }) {

    let ToasterElement = document.getElementById('Toaster')

    if (!ToasterElement) {
      ToasterElement = document.createElement('div')
      ToasterElement.id = 'Toaster'
      document.body.appendChild(ToasterElement)
    }

    const ToasterComponent = new (Vue.extend(Toaster))()
    ToasterComponent.$mount(ToasterElement)

    Vue.prototype.$toaster = {
      show (toast) {
        toast.id = Date.now()
        if (ToasterComponent.$data.toasts.length >= options.maxToasts) {
          ToasterComponent.$data.toasts.pop()
        }
        ToasterComponent.$data.toasts.unshift(toast)
      }
    }
  }
}
