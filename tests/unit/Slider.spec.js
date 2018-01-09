import Vue from 'vue'
import Slider from 'components/Slider/Slider'

describe('Slider.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Slider)
    })
    expect(vm.$el.querySelector('.ui-slider-track')).toBeDefined()
  });

  it('renders to a nice snapshot', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Slider),
    });
    renderer.renderToString(vm, (err, str) => {
      expect(str).toMatchSnapshot();
    });
  });
})
