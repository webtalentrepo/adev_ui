<template>
  <div>
    <div style="padding: 20px">
      <button class="ui-button">Button</button>
      <button class="ui-button ui-intent-primary">Button</button>
      <button class="ui-button ui-intent-success">Button</button>
      <button class="ui-button ui-intent-danger">Button</button>
      <button class="ui-button ui-intent-warning">Button</button>
    </div>
  </div>
</template>
<script>
import Select from '@/components/Select2.vue'
import Select2 from '@/components/Select.vue'
export default {
  name: 'App',
  components: {
    "vselect": Select,
    "vvselect": Select2,
  },
  data: () => ({
    currentPage: 0,
    options: [
      {label: 'one', value: 1},
      {label: 'two', value: 2},
      {label: 'three', value: 3},
      {label: 'four', value: 4},
      {label: 'five', value: 5},
      {label: 'six', value: 6},
    ]
  }),
  methods: {
  }
}
</script>
<style lang="stylus">
  .my-div {
    height: 100px;
    width: 200px;
  }
  .unscrollbar-wrapper {
    overflow: hidden;
  }
  .unscrollbar-content {
    width: calc(100% + 10px);
    height: 100%;
    overflow: auto;
  }
</style>
