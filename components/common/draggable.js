import DocumentEventHelper from './mixins/DocumentEventHelper'
import { relativeMouseOffset } from './utilities'

export default {
  mixins: [DocumentEventHelper],

  props: {
    targetSelector: String,
    disabled: Boolean
  },

  isDragging: false,

  watch: {
    target: 'bindTarget'
  },

  mounted () {
    this.bindTarget()
  },

  events: {
    mousedown (event) {
      return this.dragStart(event, this.offsetByMouse)
    },

    mousemove (event) {
      return this.dragMove(event, this.offsetByMouse)
    },

    mouseup (event) {
      return this.dragEnd(event, this.offsetByMouse)
    },

    touchstart (event) {
      return this.dragStart(event, this.offsetByTouch)
    },

    touchmove (event) {
      return this.dragMove(event, this.offsetByTouch)
    },

    touchend (event) {
      return this.dragEnd(event, this.offsetByTouch)
    },

    touchcancel (event) {
      return this.dragEnd(event, this.offsetByTouch)
    }
  },

  methods: {
    bindTarget () {
      this.target = this.$el.querySelector(this.targetSelector) || this.$el
    },

    offsetByMouse (event) {
      return relativeMouseOffset(event, this.$el)
    },

    offsetByTouch (event) {
      const touch = event.touches.length === 0 ? event.changedTouches[0] : event.touches[0]
      return relativeMouseOffset(touch, this.$el)
    },

    dragStart (event, f) {
      if (this.disabled || this.target !== event.target) return
      event.preventDefault()
      this.$options.isDragging = true
      this.$emit('dragstart', event, f(event), this.target)
    },

    dragMove (event, f) {
      if (!this.$options.isDragging) return
      event.preventDefault()
      this.$emit('drag', event, f(event), this.target)
    },

    dragEnd (event, f) {
      if (!this.$options.isDragging) return
      event.preventDefault()
      this.$options.isDragging = false
      this.$emit('dragend', event, f(event), this.target)
    }
  },

  render () {
    return this.$slots.default && this.$slots.default[0]
  }
}
