<template>
  <ui-Dialog :show="true">
    <DialogHeader :showClose="showClose" :icon="dialogIcon">{{name}}</DialogHeader>
    <h3>This is slot number two</h3>
    <small>I can put more info in, too!</small>
    <DialogFooter>
      <button class="ui-button"
              @click="log">Hi</button>
      <button class="ui-button"
              @click="$emit('close')">X</button>
      <button class="ui-button"
              @click="switchIcon">Icon</button>
      <button class="ui-button"
              @click="say()">Show Close</button>
    </DialogFooter>
  </ui-Dialog>
</template>

<script>
import Dialog from '@/components/Dialog'
const ICONS = ['automatic-updates', 'fork', 'help', 'resolve']
export default {
  components: { 'ui-Dialog': Dialog },
  props: ['name'],
  name: 'MyModal',
  data: () => ({
    showClose: false,
    dialogIcon: 'automatic-updates'
  }),
  isModal: true,
  methods: {
    log() {
      this.$emit('log')
    },
    say(s) {
      this.$emit('closeme')
    },
    switchIcon() {
      this.dialogIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
    },
    showCloseButton() {
      this.showClose = !this.showClose
    },
  }
}
</script>
<style lang="stylus">

</style>
