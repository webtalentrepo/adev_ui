<template>
  <click-outside :handler="onClickOutside">
    <div @click="showOptions = true" @keydown="keyDown" class="ui-tag-input ui-active ui-multi-select">
      <div class="container">
        <span :key="option.value" v-for="option in options" v-if="option.selected" class="ui-tag ui-tag-removable">
          {{option.label}}
          <button type="button" class="ui-tag-remove" @click="option.selected = false"></button>
        </span>
        <input v-model="filter" @blur="showOptions = false" placeholder="Search..." class="ui-input-ghost">
      </div>
      <div v-if="showOptions" class="ui-menu ui-elevation-4">
        <ul>
          <template v-if="filteredOptions.length > 0">
            <li class="ui-menu-item" :key="option.value" :class="{'ui-active': option.selected, 'focus': isFocused(option)}" @click="option.selected = !option.selected" v-for="option in filteredOptions">{{option.label}}</li>
          </template>
          <li class="ui-disabled ui-menu-item" v-else>No options</li>
        </ul>
      </div>
    </div>
  </click-outside>
</template>

<script>
import ClickOutside from "./common/click-outside.js";
export default {
  name: "Select",
  components: {
    ClickOutside
  },
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    options: {
      default: () => []
    }
  },

  model: {
    prop: "options",
    event: "change"
  },

  data: () => ({
    filter: "",
    showOptions: false,
    focusIndex: -1
  }),

  computed: {
    filteredOptions() {
      return this.filter == ""
        ? this.options
        : this.options.filter(option => option.label.indexOf(this.filter) > -1);
    },
    selected() {
      return this.options.filter(option => option.selected);
    }
  },
  methods: {
    onClickOutside(e) {
      this.showOptions = false;
    },
    keyDown(e) {
      if (e.keyCode === 40) {
        this.focusIndex++;
        this.focusIndex = this.focusIndex >= this.filteredOptions.length ? 0 : this.focusIndex;
        e.preventDefault();
      } else if (e.keyCode === 38) {
        this.focusIndex--;
        this.focusIndex = this.focusIndex < 0 ? (this.filteredOptions.length -1) : this.focusIndex;
        e.preventDefault();
      } else if (e.keyCode === 13 && this.focusIndex > -1 && this.focusIndex < this.filteredOptions.length) {
        this.filteredOptions[this.focusIndex].selected = true;
      } else if (e.keyCode === 27) {
        this.showOptions = false;
      } else {
        this.showOptions = true;
      }
    },
    isFocused(option) {
      return this.filteredOptions.indexOf(option) === this.focusIndex;
    }
  },
  watch: {},
  created() {}
};
</script>

<style lang="stylus">
.ui-multi-select {
  position: relative;


  ul {
    padding: 0;
    overflow-y: scroll;
    li.focus {
      background-color: lightblue;
    }
  }

  input {
    flex: 1;
    margin: 0;
    padding: 4px 2px;
    max-width: 100%;
    &:focus {
      outline: none;
    }
  }
  .container {
    outline: none;
    border: none;
    border-radius: 3px;
    box-shadow: 0 0 0 0 rgba(19, 124, 189, 0), 0 0 0 0 rgba(19, 124, 189, 0), inset 0 0 0 1px rgba(16, 22, 26, 0.15), inset 0 1px 1px rgba(16, 22, 26, 0.2);
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    padding: 2px;
  }

  .ui-tag {
    margin: 2px;
  }

  .ui-menu {
    margin-top: 5px;
    width: 100%;
    min-width: 0;
    position: absolute;
    z-index: 1000;
    left: 0;
  }
}
</style>
