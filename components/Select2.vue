<template>
  <click-outside :handler="onClickOutside">
    <div>
    <button type="button" class="ui-button">
      <span>The Shawshank Redemption</span>
      <span class="ui-icon-standard ui-icon-caret-down ui-align-right"></span>
    </button>
    <div class="ui-popover ui-select-popover">
      <span class="ui-popover-arrow">
        <svg viewBox="0 0 30 30" style="transform: rotate(-90deg);">
          <path class="ui-popover-arrow-border" d="M8.11 6.302c1.015-.936 1.887-2.922 1.887-4.297v26c0-1.378-.868-3.357-1.888-4.297L.925 17.09c-1.237-1.14-1.233-3.034 0-4.17L8.11 6.302z"></path>
          <path class="ui-popover-arrow-fill" d="M8.787 7.036c1.22-1.125 2.21-3.376 2.21-5.03V0v30-2.005c0-1.654-.983-3.9-2.21-5.03l-7.183-6.616c-.81-.746-.802-1.96 0-2.7l7.183-6.614z"></path>
        </svg>
      </span>
      <div class="ui-popover-content">
        <div class="ui-input-group">
          <span class="ui-icon ui-icon-search"></span>
          <input type="text" placeholder="Filter..." value="" class="ui-input" style="padding-right: 0px;">
        </div>
        <ul class="ui-menu">
          <li :key="c.data.key" v-for="c in $slots.default" v-if="$slots.default" class="">
            <a class="ui-menu-item" :class="{'ui-active': isSelected(c)}" tabindex="0">
              {{log(c)}}
              {{c.children}}
            </a>
          </li>
        </ul>
      </div>
    </div>
    </div>
  </click-outside>
</template>

<script>
import ClickOutside from './common/click-outside.js';
export default {
  name: 'Select',
  components: {
    ClickOutside
  },

  props: {},

  model: {
    prop: 'value',
    event: 'change'
  },

  data: () => ({
    selected: null
  }),

  computed: {},

  methods: {
    log(m) {
      console.log(m);
    },
    isSelected(c) {
      if (c.data.attrs && c.data.attrs.selected) {
        this.selected = c.data.attrs.value
        return true
      }
    },
    onClickOutside(e) {
      this.showOptions = false;
    }
  },
  watch: {},
  created() {}
};
</script>

<style lang="stylus">
</style>
