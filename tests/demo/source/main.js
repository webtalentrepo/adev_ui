import Vue from 'vue'
import App from './components/App2.vue'

import Request from './../../../utilities/Request'
new Vue({
  el: '#app',
  render: h => h(App)
})

window.request = function () {
  Request.get('http://speed.hetzner.de/10GB.bin', {
    responseType: 'arraybuffer',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then(response => new Buffer(response.data, 'binary').toString('base64'))
    .progress((v, t) => console.log(v, t))
    .catch(e => console.log(e))
  // .cancel("nnn")
}
