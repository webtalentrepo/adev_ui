<template>
  <div class="ui-numeric-input ui-control-group ui-fill">
    <div class="ui-input-group">
      <span class="ui-icon ui-icon-dollar"></span>
      <input type="text"
             placeholder="Enter a number..."
             v-model.lazy.number="currentValue"
             :disabled="disabled"
             class="ui-input">
    </div>
    <div class="ui-button-group ui-vertical ui-fixed">
      <button type="button"
              class="ui-button ui-icon-chevron-up"
              :disabled="disabled"></button>
      <button type="button"
              class="ui-button ui-icon-chevron-down"
              :disabled="disabled"></button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NumericInput',
  model: {
    prop: 'currentValue',
    event: 'change'
  },
  props: {
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
      default: Infinity
    },
    max: {
      type: Number,
      default: Infinity
    }
  },
  data: () => ({
    currentValue: 0
  }),

  watch: {
    currentValue: function () {
       this.$emit('change', this.currentValue)
    }
  },

  created () {
     this.currentValue = this.value
  }
}
</script>
<style lang="stylus">

</style>
