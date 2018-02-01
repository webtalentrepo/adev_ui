<template>
  <div class="ui-select">
    <button class="ui-button"
            @blur="onBlur"
            :tabindex="showOptions ? -1 : 0"
            @mousedown.prevent="showOptions = !showOptions"
            @focus="showOptions = true">{{selectedLabel ? selectedLabel : placeholder}}</button>
    <div v-if="showOptions"
         class="ui-menu ui-elevation-4">
      <label class="ui-label"
             :class="{unsearchable: !isSearchable}">
        <input class="ui-input"
               v-model="filter"
               type="text"
               :readonly="!isSearchable"
               @blur="onBlur"
               @keydown.up.prevent="upKey"
               @keydown.down.prevent="downKey"
               @keyup.enter="selectOption(highlighted)"
               @keyup.esc="showOptions = false"
               @mousedown.stop>
      </label>
      <ul>
        <template v-if="filteredOptions.length > 0">
          <li class="ui-menu-item"
              :key="option.index"
              :class="{'ui-active': option.index === highlighted}"
              @mousedown.prevent="selectOption(option.index)"
              :data-i="option.index"
              v-for="option in filteredOptions">{{option.label}}</li>
        </template>
        <li class="ui-disabled ui-menu-item"
            v-else>No options</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    select: {
      type: String
    },
    selectValue: {
      default: -1
    },
    updateOnHighlight: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: true
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
    highlighted: -1
  }),

  computed: {
    filteredOptions() {
      let options = this.filter == '' ?
        this.options :
        this.options
        .filter(option =>
          option.label.toLowerCase().includes(this.filter.toLowerCase())
        );
      return options.map(option => {
        option.index = options.findIndex(opt => opt === option)
        return option;
      });
    },
    selectedLabel() {
      return this.selected == -1 ?
        this.placeholder :
        this.options[this.selected].label;
    },
    selectedValue() {
      return this.selected == -1 ? null : this.filteredOptions[this.selected].value;
    },
    isSearchable() {
      return this.options.length > 5 && this.searchable;
    }
  },

  methods: {
    selectOption(index, show = false) {
      this.selected = index;
      this.highlighted = index;
      this.$emit('change', this.selectedValue);
      this.showOptions = show;
    },
    onBlur() {
      this.$nextTick(() => {
        this.showOptions = this.$el.contains(document.activeElement);
      });
    },
    downKey() {
      let option = this.filteredOptions.find(
        option => parseInt(option.index) === parseInt(this.highlighted) + 1
      );
      if (!option) {
        option = this.filteredOptions[0];
      }
      this.highlight(option);
    },
    upKey() {
      let option = this.filteredOptions.find(
        option => parseInt(option.index) === parseInt(this.highlighted) - 1
      );
      if (!option) {
        option = this.filteredOptions[this.filteredOptions.length - 1];
      }
      this.highlight(option);
    },
    highlight(option) {
      if (this.updateOnHighlight) {
        this.selectOption(option.index, true);
      } else {
        this.highlighted = option.index;
      }
      this.maybeAdjustScroll();
    },
    maybeAdjustScroll() {
      this.$nextTick(() => {
        let list = this.$el.querySelector('ul');
        if (list.scrollHeight > list.clientHeight) {
          this.$el
            .querySelector('li.ui-active')
            .scrollIntoView({ block: 'nearest' });
        }
      });
    }
  },
  watch: {
    showOptions(value) {
      if (!value) {
        return this.$emit('blur');
      }
      this.$nextTick(() => {
        this.$el.querySelector('input').focus();
      });
    },
    select(value) {
      this.selected = this.options.findIndex(option => option.value == value);
    },
    selectValue(index) {
      this.selected = index;
    }
  },
  created() {
    let selected = -1;
    this.options = this.$slots.default.reduce((accumulator, node) => {
      if (node.tag === 'option') {
        const attrs = node.data.domProps || node.data.attrs || null;
        accumulator.push({
          index: accumulator.length,
          label: (node.children && node.children[0].text) || '',
          value: attrs && attrs.value
        });

        if (attrs && attrs.selected) {
          selected = accumulator.length - 1;
        }
      }
      return accumulator;
    }, []);
    if (selected != -1) {
      this.selectOption(selected);
    }
  }
};
</script>

<style lang="stylus">
.ui-select ul {
  padding: 0;
  overflow-y: scroll;
}

.ui-select > .ui-button {
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

label.ui-label.unsearchable {
  opacity: 0;
  margin: 0;
  .ui-input {
    margin: 0;
    max-height: 0;
  }
}
</style>