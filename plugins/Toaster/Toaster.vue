<template>
  <transition-group id="Toaster"
                    name="toast"
                    tag="div">
    <Toast v-for="(toast, index) in toasts"
           @expired="remove(index)"
           :key="toast.id"
           :intent="toast.intent"
           :icon="toast.icon"
           :actions="toast.actions">{{toast.message}}</Toast>
  </transition-group>
</template>
<script>
import Toast from './Toast'
export default {
  name: 'Toaster',
  components: { Toast },
  data: () => ({
    toasts: [],
  }),
  methods: {
    remove(index) {
      this.toasts.splice(index, 1)
    }
  }
}
</script>
<style lang="stylus">
#Toaster {
  position: fixed;
  display: block;
  top: 0;
  right: 10px;
  z-index: 10000;
  .toast-enter-active,
  .toast-leave-active {
    transition: opacity .5s, transform .25s ease-in-out;
  }

  .toast-enter,
  .toast-leave-to {
    opacity: 0;
    transform: scale(0);
  }

  .toast-enter-to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
