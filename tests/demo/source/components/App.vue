<template>
  <main id="app">
    <transition name="slide"
                mode="out-in">
      <div v-if="controls"
           id="sidebar"
           class="ui-dark">
        <label class="ui-control ui-switch">
          <input type="checkbox"
                 v-model="controls" />
          <span class="ui-control-indicator"></span> Switch
        </label>
        <label class="ui-label">
          <span class="ui-label-content">Top Spacing:</span>
          <Slider v-model="marginTop"
                  :value="test"
                  :min="0"
                  :max="50"></Slider>
        </label>
        <label class="ui-label">
          <span class="ui-label-content">Bottom Spacing:</span>
          <Slider v-model="marginBottom"
                  :value="10"
                  :min="0"
                  :max="50"></Slider>
        </label>
        <div class="ui-section ui-inline">
          <label class="ui-label">Alignment:</label>
          <div class="ui-button-group">
            <button @click="textAlign = 'left'"
                    :class="{'ui-active': textAlign == 'left'}"
                    class="ui-button ui-icon-align-left"></button>
            <button @click="textAlign = 'center'"
                    :class="{'ui-active': textAlign == 'center'}"
                    class="ui-button ui-icon-align-center"></button>
            <button @click="textAlign = 'right'"
                    :class="{'ui-active': textAlign == 'right'}"
                    class="ui-button ui-icon-align-right"></button>
          </div>
        </div>
        <div class="ui-section ui-inline">
          <label class="ui-label">Alignment:</label>
          <div class="ui-button-group">
            <button class="ui-button ui-icon">
              <svg>
                <use xlink:href="./assets/images/icons.svg#rounded-corner"></use>
              </svg>
            </button>
            <button class="ui-button ui-icon">
              <svg>
                <use xlink:href="./assets/images/icons.svg#sharp-corner"></use>
              </svg>
            </button>
          </div>
        </div>
        <label class="ui-label">
          <span class="ui-label-content">Font Family:</span>
          <ui-select v-model="fontIndex"
                     class="my-select"
                     placeholder="Select Font">
            <option v-for="(font, index) in fonts"
                    :key="index"
                    :value="index"
                    :selected="index == fontIndex"
                    class="ui-menu-item">{{font}}</option>
          </ui-select>
        </label>
        <label class="ui-label">
          <p class="ui-label-content">Font Size:</p>
          <Slider v-model="fontSize"
                  :value="fontSize"
                  :min="0"
                  :max="72"></Slider>
        </label>
        <label class="ui-label">
          <span class="ui-label-content">Line Height:</span>
          <Slider v-model="lineHeight"
                  :value="lineHeight"
                  :min="0"
                  :step=".1"
                  :max="3"></Slider>
        </label>
      </div>
      <div id="sidebar"
           v-else
           class="ui-dark">
        <label class="ui-control ui-switch">
          <input type="checkbox"
                 v-model="controls" />
          <span class="ui-control-indicator"></span> Switch
        </label>
        <ul class="components">
          <li class="component ui-card ui-elevation-1">
            <div class="wrapper">
              <svg class="ui-icon">
                <use xlink:href="./assets/images/icons.svg#align-left"></use>
              </svg>
              <span class="label">Text</span>
            </div>
          </li>
          <li class="component ui-card ui-elevation-1">
            <div class="wrapper">
              <svg class="ui-icon">
                <use xlink:href="./assets/images/icons.svg#media"></use>
              </svg>
              <span class="label">Image</span>
            </div>
          </li>
          <li class="component ui-card ui-elevation-1">
            <div class="wrapper">
              <svg class="ui-icon">
                <use xlink:href="./assets/images/icons.svg#button"></use>
              </svg>
              <span class="label">Button</span>
            </div>
          </li>
          <li class="component ui-card ui-elevation-1">
            <div class="wrapper">
              <svg class="ui-icon">
                <use xlink:href="./assets/images/icons.svg#divider"></use>
              </svg>
              <span class="label">Divider</span>
            </div>
          </li>
          <li class="component ui-card ui-elevation-1">
            <div class="wrapper">
              <svg class="ui-icon fill-width">
                <use xlink:href="./assets/images/icons.svg#single-column-layout-wide"></use>
              </svg>
              <span class="label">Column</span>
            </div>
          </li>
          <li class="component ui-card ui-elevation-1">
            <div class="wrapper">
              <svg class="ui-icon fill-width">
                <use xlink:href="./assets/images/icons.svg#two-columns-layout-wide"></use>
              </svg>
              <span class="label">Columns</span>
            </div>
          </li>
          <li class="component ui-card ui-elevation-1">
            <div class="wrapper">
              <svg class="ui-icon fill-width">
                <use xlink:href="./assets/images/icons.svg#left-column-layout-wide"></use>
              </svg>
              <span class="label">Columns</span>
            </div>
          </li>
          <li class="component ui-card ui-elevation-1">
            <div class="wrapper">
              <svg class="ui-icon fill-width">
                <use xlink:href="./assets/images/icons.svg#right-column-layout-wide"></use>
              </svg>
              <span class="label">Columns</span>
            </div>
          </li>
          <li class="component ui-card ui-elevation-1">
            <div class="wrapper">
              <svg class="ui-icon fill-width">
                <use xlink:href="./assets/images/icons.svg#three-columns-layout-wide"></use>
              </svg>
              <span class="label">Columns</span>
            </div>
          </li>
        </ul>
      </div>
    </transition>
    <div id="content">
      <button class="ui-button"
              @click="Help">click</button>
      <button class="ui-button"
              @click="Yes">click</button>
      <h1 :style="{
                    fontFamily: `${fontFamily}`,
                    textAlign: `${textAlign}`,
                    fontSize: `${fontSize}px`,
                    lineHeight: `${lineHeight}`,
                    marginTop: `${marginTop}px`,
                    marginBottom: `${marginBottom}px`,
                  }">Test Content</h1>
      <p>Other content</p>
      <button class="ui-button"
              @click="toggle = !toggle">toggle</button>
    </div>
    <Modal @close="toggle = false"
           :show="toggle">
      <h3>Hello</h3>
      <p>You want to continue?</p>
      <div class="ui-button-group">
        <button class="ui-button">No</button>
        <button @click="toggle = false"
                class="ui-button">Next</button>
      </div>
    </Modal>
    <Loading></Loading>
  </main>
</template>

<script>
import Modal from '@/components/Modal.vue'
import Slider from '@/components/Slider.vue'
import Select from '@/components/Select.vue'
import NumericInput from '@/components/NumericInput.vue'
import PictureInput from '@/components/PictureInput.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'App',
  components: { Modal, Loading, Slider, 'ui-select': Select, NumericInput, PictureInput },
  data: () => ({
    controls: false,
    fontSize: 12,
    lineHeight: 1,
    marginTop: 0,
    marginBottom: 0,
    fonts: ['serif', 'sans-serif', 'monospace'],
    fontIndex: 0,
    textAlign: 'left',
    test: 6,
    toggle: false
  }),
  computed: {
    fontFamily() {
      return this.fonts[this.fontIndex]
    }
  },
  methods: {
    Help() {
      this.$toaster.show({
        message: "Hello",
        icon: "cog",
        intent: "warning",
        actions: [
          {
            label: "Retry",
            action: () => {
              console.log(this)
            }
          },
          {
            icon: "moon",
            action: () => {
              console.log(this)
            }
          }
        ]
      })
    },
    Yes() {
      this.$toaster.show({
        message: "Hello",
        icon: "cog",
        intent: "success",
        actions: [
          {
            label: "Retry",
            action: () => {
              console.log(this)
            }
          },
          {
            icon: "moon",
            action: () => {
              console.log(this)
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="stylus">
// background: RGBA(65, 76, 85, 1.00);


.ui-dark .ui-control.ui-switch:hover input:checked ~ .ui-control-indicator, .ui-dark .ui-control.ui-switch:hover .ui-control.ui-checkbox input:indeterminate ~ .ui-control-indicator, .ui-control.ui-checkbox .ui-dark .ui-control.ui-switch:hover input:indeterminate ~ .ui-control-indicator {
 background: lighten(rgba(251, 85, 123, 1.00), 5)
}

.ui-dark .ui-control.ui-switch input:checked ~ .ui-control-indicator, .ui-dark .ui-control.ui-switch .ui-control.ui-checkbox input:indeterminate ~ .ui-control-indicator, .ui-control.ui-checkbox .ui-dark .ui-control.ui-switch input:indeterminate ~ .ui-control-indicator {
 background:rgba(251, 85, 123, 1.00)
}
.ui-slider-progress, .ui-dark .ui-slider-progress {
 background: rgba(251, 85, 123, 1.00) !important;
}
.ui-button.ui-icon svg {
  width: 1rem;
  height: 1rem;
  fill: #bfccd6;
}

.ui-button.ui-icon{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

#app {
  display: flex;
  min-height: 100vh
}

#sidebar {
  width: 250px;
  background: RGBA(65, 76, 85, 1.00);
  padding: 20px;
}

.ui-label-content {
  display: block;
  margin-bottom: 10px;
}

label.ui-label {
  margin-bottom: 30px
}

.ui-section {
  margin-bottom: 30px
}

.ui-section label {
  margin: 0
}

.ui-section.ui-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#content {
  padding: 20px;
  flex: 1;
}

*:focus {
  outline: none !important;
}

.ui-dark .ui-slider-handle, .ui-dark .ui-slider-handle:hover,
.ui-dark .ui-button:not([class*="ui-intent-"]),
.ui-dark .ui-select .ui-menu {
  background-color: darken(rgba(65, 76, 85, 1.00),5)
}

 .ui-dark .ui-button:not([class*="ui-intent-"]):hover {
  background-color: darken(rgba(65, 76, 85, 1.00),2)!important;

}
.components {
  user-select: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.components>.component {
  width: calc(50% - 10px);
  margin-bottom: 20px;
  display: flex;
  cursor: -webkit-grab;
  padding: 15px;
  background: RGBA(65, 76, 85, 1.00);
}

.ui-icon.fill-width {
    max-width: 100%;
    width: 100%;
}

.components>.component>.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.components>.component>.wrapper .ui-icon {
  width: 2rem;
  height: 2rem;
  fill: currentColor;
  margin: auto;
  opacity: .5;
}
.components>.component>.wrapper .ui-icon.fill-width {
    max-width: 100%;
    width: 100%;
}

.components>.component>.wrapper span {
  opacity: .5
}

.components>.component:active {
  cursor: -webkit-grabbing;
}

.components>.component:hover {
  box-shadow: 0 0 0 1px rgba(16,22,26,0.1), 0 2px 4px rgba(16,22,26,0.4), 0 8px 24px rgba(16,22,26,0.2);
}

.components>.component:active>.wrapper span,
.components>.component:hover>.wrapper span {
  opacity: 1;
}

.components>.component:active>.wrapper .ui-icon ,
.components>.component:hover>.wrapper .ui-icon  {
  opacity: 1;
}

.components>.component:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform .2s cubic-bezier(.45, 0, .21, 1), opacity .2s cubic-bezier(.45, 0, .21, 1);
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
