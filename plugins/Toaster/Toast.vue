<template>
  <div class="ui-toast ui-overlay-content"
       :class="intent && `ui-intent-${intent}`">
    <span v-if="icon"
          class="ui-icon-standard"
          :class="`ui-icon-${icon}`"></span>
    <span class="ui-toast-message">
      <slot></slot>
    </span>
    <div class="ui-button-group ui-minimal">
      <button v-for="action in actions"
              @click="action.action"
              class="ui-button"
              :class="action.icon && `ui-icon-${action.icon}`">{{action.label}}</button>
    </div>
  </div>
</template>

<style>

</style>

<script>
export default {
  props: ['intent', 'icon', 'actions'],
  name: 'toast',
  mounted() {
    this.timer = setTimeout(() => {
      this.$emit('expired')
    }, 5000)
  },
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>
<style lang="stylus">

</style>
