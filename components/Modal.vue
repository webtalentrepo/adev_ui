<template>
  <transition :name="transition">
    <div v-show="show"
         :style="{zIndex}"
         class="ui-modal">
      <div @click="$emit('close', 'overlay')"
           class="ui-modal-overlay"
           tabindex="0"></div>
      <div class="ui-modal-content"
           tabindex="0">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
let ModalsContainer = document.getElementById('ui-modals');

if (!ModalsContainer) {
  ModalsContainer = document.createElement('div');
  ModalsContainer.id = 'ui-modals';
  document.body.appendChild(ModalsContainer);
}

let ZINDEX = 9000;
let ModalsStack = [];

window.addEventListener('keydown', event => {
  // ESC Key Code: 27
  if (event.keyCode === 27 && ModalsStack.length > 0) {
    ModalsStack[ModalsStack.length - 1].$emit('close', 'escape');
  }
});

function show(modal) {
  ModalsStack.push(modal);
  document.body.classList.add('ui-modal-visible');
  return ZINDEX++;
}

function hide(modal) {
  ModalsStack = ModalsStack.filter(m => m._uid != modal._uid);
  if (ModalsStack.length == 0) {
    document.body.classList.remove('ui-modal-visible');
  }
  return ZINDEX--;
}

export default {
  abstract: true,
  props: {
    show: { type: Boolean, default: false },
    transition: { type: String, default: 'modal' }
  },

  computed: {
    zIndex() {
      return (this.show ? show : hide)(this);
    }
  },

  mounted() {
    ModalsContainer.appendChild(this.$el);
  },

  beforeDestroy() {
    hide(this);
  },

  destroyed() {
    if (ModalsContainer.contains(this.$el)) {
      ModalsContainer.removeChild(this.$el);
    }
  }
};
</script>

<style  lang="stylus">
.ui-modal, .ui-modal-overlay {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ui-modal {
  position: fixed;
  z-index: 9998;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.ui-modal-overlay {
  position: absolute;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.ui-modal-content {
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}

.modal-enter .ui-modal-content, .modal-leave-to .ui-modal-content {
  transform: scale(0.7);
}

.modal-slide-right-enter, .modal-slide-right-leave-to {
  opacity: 0;

  & .ui-modal-content {
    transform: translateX(20%);
  }
}

.modal-slide-right-enter-to, .modal-slide-right-leave, .modal-slide-left-enter-to, .modal-slide-left-leave {
  opacity: 1;

  & .ui-modal-content {
    transform: translateX(0);
  }
}

.modal-slide-left-enter, .modal-slide-left-leave-to {
  opacity: 0;

  & .ui-modal-content {
    transform: translateX(-20%);
  }
}

.modal-slide-top-enter, .modal-slide-top-leave-to {
  opacity: 0;

  & .ui-modal-content {
    transform: translateY(-20%);
  }
}

.modal-slide-bottom-enter, .modal-slide-bottom-leave-to {
  opacity: 0;

  & .ui-modal-content {
    transform: translateY(20%);
  }
}

.modal-slide-bottom-enter-to, .modal-slide-bottom-leave, .modal-slide-top-enter-to, .modal-slide-top-leave {
  opacity: 1;

  & .ui-modal-content {
    transform: translateY(0);
  }
}

.modal-slide-bottom-enter-active, .modal-slide-bottom-leave-active, .modal-slide-top-enter-active, .modal-slide-top-leave-active, .modal-slide-right-enter-active, .modal-slide-right-leave-active, .modal-slide-left-enter-active, .modal-slide-left-leave-active {
  transition: opacity 0.3s;

  & .ui-modal-content {
    transition: transform 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
  }
}

.modal-fall-enter-active, .modal-fall-leave-active {
  perspective: 1000px;
  transition: opacity 0.3s;

  & .ui-modal-content {
    transform-style: preserve-3d;
    transition: transform 0.3s ease-in;
    transform-origin: 50% 0;
  }
}

.modal-fall-enter, .modal-fall-leave-to {
  opacity: 0;

  & .ui-modal-content {
    transform: translateZ(100px) rotateX(20deg);
  }
}

.modal-fall-enter-to, .modal-fall-leave {
  opacity: 1;

  & .ui-modal-content {
    transform: translateZ(0) rotateX(0);
  }
}
</style>

