<template>
  <draggable @drag="onDrag"
             @dragend="onDragEnd"
             target-selector=".ui-slider-handle">
    <div @click="onClick"
         class="ui-slider"
         ref="track">
      <div class="ui-slider-track"></div>
      <div class="ui-slider-progress"
           :style="{left: '0px', width: `${percentValue}%`}"></div>
      <div class="ui-slider-axis">
        <div class="ui-slider-label">{{min}}</div>
        <div class="ui-slider-label"
             style="left: 100%">{{max}}</div>
      </div>
      <span class="ui-slider-handle"
            tabindex="0"
            :style="{left: `${percentValue}%`}">
              <span class="ui-slider-label">{{currentValue | formatValue(step)}}</span>
      </span>
    </div>
  </draggable>
</template>

<script>
import Draggable from './common/draggable.js'
import { round, clamp } from './common/utilities.js'

export default {
  name: 'Slider',
  model: {
    prop: 'currentValue',
    event: 'change'
  },

  components: {
    Draggable
  },

  props: {
    name: String,
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    }
  },

  data: () => ({
    currentValue: 0
  }),

  computed: {
    percentValue() {
      return (this.currentValue - this.min) / (this.max - this.min) * 100
    }
  },
  methods: {
    handelEvent(e) {
      const event = e.touches ? e.touches.length === 0 ? e.changedTouches[0] : e.touches[0] : e
      const bounds = this.$refs.track.getBoundingClientRect()
      this.updateValue(round(((event.clientX - bounds.left) / bounds.width) * (this.max - this.min) + this.min, this.min, this.max, this.step))

    },
    updateValue(value) {
      this.currentValue = value
      this.$emit('change', this.currentValue)
    },

    onClick(e) {
      this.handelEvent(e)
    },

    onDrag(e, offset, target) {
      this.handelEvent(e)
    },

    onDragEnd(e, offset, target) {
      this.$emit('change', this.currentValue)
    },
  },
  filters: {
    formatValue(value, step = 1) {
      return value.toFixed(Math.log10(1 / step))
    }
  },
  watch: {
    value(newVal){
      if (this.currentValue != newVal) {
        this.updateValue(newVal)
      }
    },
  },
  created () {
    this.currentValue = this.value
  }
}
</script>

<style lang="stylus">
.ui-slider {
  position: relative;
  cursor: default;
  width: 100%;
  min-width: 150px;
  height: 40px;
  outline: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.ui-slider:hover {
  cursor: pointer;
}

.ui-slider:active {
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
  cursor: grabbing;
}

.ui-slider.ui-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-slider.ui-slider-unlabeled {
  height: 16px;
}

.ui-slider-track,
.ui-slider-progress {
  position: absolute;
  top: 5px;
  right: 0;
  left: 0;
  border-radius: 3px;
  background: rgba(92, 112, 128, 0.2);
  height: 6px;
}

.ui-dark .ui-slider-track,
.ui-dark .ui-slider-progress {
  background: rgba(16, 22, 26, 0.5);
}

.ui-slider-progress,
.ui-dark .ui-slider-progress {
  background: #137cbd;
}

.ui-slider-handle {
  background: #f5f8fa;
  background: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0)) left no-repeat, center no-repeat #f5f8fa;
  box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), inset 0 -1px 0 rgba(16, 22, 26, 0.1);
  color: #182026;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.2), 0 1px 1px rgba(16, 22, 26, 0.2);
  cursor: pointer;
  width: 16px;
  height: 16px;
}

.ui-slider-handle:hover {
  background: #ebf1f5;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0)) left no-repeat, center no-repeat #ebf1f5;
  box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), inset 0 -1px 0 rgba(16, 22, 26, 0.1);
  background-clip: padding-box;
}

.ui-slider-handle:active,
.ui-slider-handle.ui-active {
  box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), inset 0 1px 2px rgba(16, 22, 26, 0.2);
  background-color: #d8e1e8;
  background-image: none;
}

.ui-slider-handle:disabled,
.ui-slider-handle.ui-disabled {
  outline: none;
  box-shadow: none;
  background-color: rgba(206, 217, 224, 0.5);
  background-image: none;
  cursor: not-allowed;
  color: rgba(92, 112, 128, 0.5);
}

.ui-slider-handle:disabled.ui-active,
.ui-slider-handle.ui-disabled.ui-active {
  background: rgba(206, 217, 224, 0.7);
}

.ui-slider-handle:focus {
  z-index: 1;
}

.ui-slider-handle:hover {
  background: #ebf1f5;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0)) left no-repeat, center no-repeat #ebf1f5;
  box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), inset 0 -1px 0 rgba(16, 22, 26, 0.1);
  background-clip: padding-box;
  z-index: 2;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.2), 0 1px 1px rgba(16, 22, 26, 0.2);
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
}

.ui-slider-handle.ui-active {
  box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), inset 0 1px 2px rgba(16, 22, 26, 0.2);
  background-color: #d8e1e8;
  background-image: none;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.2), inset 0 1px 1px rgba(16, 22, 26, 0.1);
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
  cursor: grabbing;
}

.ui-disabled .ui-slider-handle {
  box-shadow: none;
  background: #bfccd6;
  pointer-events: none;
}

.ui-dark .ui-slider-handle {
  background: #394b59;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0)) left no-repeat, center no-repeat #394b59;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.4);
  color: #f5f8fa;
}

.ui-dark .ui-slider-handle:hover,
.ui-dark .ui-slider-handle:active,
.ui-dark .ui-slider-handle.ui-active {
  color: #f5f8fa;
}

.ui-dark .ui-slider-handle:hover {
  background: #30404d;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0)) left no-repeat, center no-repeat #30404d;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.4);
}

.ui-dark .ui-slider-handle:active,
.ui-dark .ui-slider-handle.ui-active {
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.6), inset 0 1px 2px rgba(16, 22, 26, 0.2);
  background-color: #202b33;
  background-image: none;
}

.ui-dark .ui-slider-handle:disabled,
.ui-dark .ui-slider-handle.ui-disabled {
  box-shadow: none;
  background-color: rgba(57, 75, 89, 0.5);
  background-image: none;
  color: rgba(191, 204, 214, 0.5);
}

.ui-dark .ui-slider-handle:disabled.ui-active,
.ui-dark .ui-slider-handle.ui-disabled.ui-active {
  background: rgba(57, 75, 89, 0.7);
}

.ui-dark .ui-slider-handle .ui-button-spinner .ui-spinner-head {
  background: rgba(16, 22, 26, 0.5);
  stroke: #8a9ba8;
}

.ui-dark .ui-slider-handle,
.ui-dark .ui-slider-handle:hover {
  background-color: #394b59;
}

.ui-dark .ui-slider-handle.ui-active {
  background-color: #293742;
}

.ui-dark .ui-disabled .ui-slider-handle {
  border-color: #5c7080;
  box-shadow: none;
  background: #5c7080;
}

.ui-slider-handle .ui-slider-label {
  -webkit-transform: translate(-50%, 20px);
  transform: translate(-50%, 20px);
  margin-left: 8px;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2), 0 8px 24px rgba(16, 22, 26, 0.2);
  background: #394b59;
  color: #f5f8fa;
}

.ui-dark .ui-slider-handle .ui-slider-label {
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.2), 0 2px 4px rgba(16, 22, 26, 0.4), 0 8px 24px rgba(16, 22, 26, 0.4);
  background: #e1e8ed;
  color: #394b59;
}

.ui-disabled .ui-slider-handle .ui-slider-label {
  box-shadow: none;
}

.ui-slider-label {
  display: inline-block;
  padding: 2px 5px;
  vertical-align: top;
  line-height: 1;
  font-size: 12px;
  position: absolute;
  -webkit-transform: translate(-50%, 20px);
  transform: translate(-50%, 20px);
}

.ui-range-slider .ui-slider-handle {
  width: 8px;
}

.ui-range-slider .ui-slider-handle:first-of-type {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.ui-range-slider .ui-slider-handle:last-of-type {
  margin-left: 8px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.ui-range-slider .ui-slider-handle:last-of-type .ui-slider-label {
  margin-left: 0;
}

.ui-range-slider .ui-slider-progress {
  border-radius: 0;
}

.ui-slider-axis {
  display: flex;
  justify-content: space-between;
  width: 100%
}

.ui-slider-handle {
  transform: translateX(-50%);
}
</style>

