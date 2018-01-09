<template>
  <click-outside :handler="onClickOutside">
    <div class="ui-select"
         tabindex="0">
      <button class="ui-button"
              @click="showOptions = !showOptions">{{selectedLabel ? selectedLabel : placeholder}}</button>
      <div v-if="showOptions"
           class="ui-menu ui-elevation-4">
        <label class="ui-label"
               v-if="options.length > 5">
          <input class="ui-input"
                 v-model="filter"
                 type="text">
        </label>
        <ul>
          <template v-if="filteredOptions.length > 0">
            <li class="ui-menu-item"
                :key="option.index"
                :class="{'ui-active': option.index == selected}"
                @click="selectOption(option.index)"
                :data-i="option.index"
                v-for="option in filteredOptions">{{option.label}}</li>
          </template>
          <li class="ui-disabled ui-menu-item"
              v-else>No options</li>
        </ul>
      </div>
    </div>
  </click-outside>
</template>

<script>
import ClickOutside from './common/click-outside.js'
export default {
  name: 'Select',
  components: {
    ClickOutside
  },
  props: {
    'placeholder': {
      type: String,
      default: ''
    },
    'select': {
      type: String
    },
    'selectValue': {
      default: -1
    }
  },

  model: {
    prop: 'selectedValue',
    event: 'change'
  },

  data: () => ({
    options: [],
    filter: '',
    selected: -1,
    showOptions: false,
  }),

  computed: {
    filteredOptions() {
      return this.filter == '' ? this.options : this.options.filter((option) => option.label.indexOf(this.filter) > -1)
    },
    selectedLabel() {
      return this.selected == -1 ? this.placeholder : this.options[this.selected].label
    },
    selectedValue() {
      return this.selected == -1 ? null : this.options[this.selected].value
    }
  },

  methods: {
    selectOption(index) {
      this.selected = index
      this.$emit('change', this.selectedValue)
    },
    onClickOutside(e) {
      this.showOptions = false
    }
  },
  watch : {
    select(value) {
      this.selected = this.options.findIndex(option => option.value == value);
    },
    selectValue(index) {
      this.selected = index;
    }
  },
  created() {
    let selected = -1
    this.options = this.$slots.default.reduce((accumulator, node) => {
      if (node.tag === 'option') {
        const attrs = node.data.domProps || node.data.attrs || null
        accumulator.push({
          index: accumulator.length,
          label: (node.children && node.children[0].text) || '',
          value: attrs && attrs.value
        })

        if (attrs && attrs.selected) {
          selected = accumulator.length - 1
        }
      }
      return accumulator
    }, [])
    if (selected != -1) { this.selectOption(selected) }
  }
}
</script>

<style lang="stylus">
.ui-select ul {
  padding: 0;
  overflow-y: scroll;
}

.ui-select>.ui-button {
  width: 100%;
  text-align: left;
}

.ui-select .ui-input {
  width: 100%;
}

.ui-select .ui-menu {
  margin-top: 5px;
  width: 100%;
  min-width: 0;
  position: absolute;
  z-index: 1000
}
</style>
