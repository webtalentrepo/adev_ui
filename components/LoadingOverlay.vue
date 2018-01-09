<template>
  <transition name="fade">
    <div id="ui-loading-overlay"
         class="ui-dark"
         v-show="show">
      <div class="loader" :class="{'grey': !colored}"></div>
      <div class="message"
           v-show="message">
        <span>{{message}}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <circle transform="translate(8 0)" cx="0" cy="16" r="0">
            <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0"
              keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" />
          </circle>
          <circle transform="translate(16 0)" cx="0" cy="16" r="0">
            <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0.3"
              keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" />
          </circle>
          <circle transform="translate(24 0)" cx="0" cy="16" r="0">
            <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0.6"
              keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" />
          </circle>
        </svg>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LoadingOverlay',
  props: {
    message: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    colored: {
      type: Boolean,
      default: true
    }
  },
  created() {
    document.body.classList.toggle('ui-loading-overlay-visible', this.show)
  },
  watch: {
    show(value) {
      document.body.classList.toggle('ui-loading-overlay-visible', value)
    }
  }
}
</script>

<style lang="stylus">
  $sprite-size = image-size('../images/loading-sprite-grey.png')
  $brick-size = 250px 250px
  $size = 200px 200px

  #ui-loading-overlay {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .8);
    z-index: 10000;
    .message {
      display: flex;
      align-items: center;
      letter-spacing: 1px;
      font-size: 1.25em;
      margin: 10px 0;
      svg {
        height: 1.5em;
        width: 1.5em;
        fill: currentColor;
      }
    }

    .loader {
      width: $size[0];
      height: $size[1];
      background-image: url(../images/loading-sprite-colored.png);
      background-size: ($sprite-size[0]*$size[0]/$brick-size[0]) ($sprite-size[1]*$size[1]/$brick-size[1]);
      animation: loading-animation 2s steps(72) infinite;
      &.grey {
        background-image: url(../images/loading-sprite-grey.png);
      }
    }
  }

  @keyframes loading-animation {
    from { background-position: 0px; }
    to { background-position: -($sprite-size[0]*$size[0]/$brick-size[0]) }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.25s ease-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
