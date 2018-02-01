<template>
  <div>
    <slot name="reference"></slot>
    <span v-show="isVisible">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import Popper from "popper.js";
import { on, off } from "../utilities/events";

let CONTAINER = document.getElementById("ui-popups");

if (!CONTAINER) {
  CONTAINER = document.createElement("div");
  CONTAINER.id = "popups";
  document.body.appendChild(CONTAINER);
}

export default {
  props: {
    forceShow: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String,
      default: "click",
      validator: value => value == "click" || value == "hover"
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isVisible: false,
      currentPlacement: "",
      popperOptions: {
        placement: "bottom-start",
        gpuAcceleration: true,
        modifiers: {
          offsetModifier: {
            enabled: true,
            fn: (data) => {
              data.offsets.popper.top += 5;
              return data;
            }
          },
          preventOverflow: {
            enabled: false
          },
          flip: {
            enabled: false
          },
          hide: {
            enabled: false
          }
        }
      }
    };
  },
  watch: {
    isVisible(value) {
      if (value) {
        this.$emit("show");
        this.updatePopper();
      } else {
        this.$emit("hide");
      }
    },
    force: {
      handler(value) {
        this.isVisible = value;
      },
      immediate: true
    }
  },
  methods: {
    toggle() {
      if (!this.force) {
        this.isVisible = !this.isVisible;
      }
    },

    createPopper() {
      this.$nextTick(() => {
        this.popperOptions.onCreate = () => {
          this.$emit("created", this);
          this.$nextTick(this.updatePopper);
        };
        this.popperJS = new Popper(
          this.referenceElement,
          this.popperElement,
          this.popperOptions
        );
      });
    },

    updatePopper() {
      this.popperJS ? this.popperJS.scheduleUpdate() : this.createPopper();
    },

    destroyPopper() {
      if (this.isVisible) {
        return;
      }
      if (this.popperJS) {
        this.popperJS.destroy();
        this.popperJS = null;
      }
    },

    onMouseOver() {
      this.isVisible = true;
      clearTimeout(this.mouseOutTimer);
    },

    onMouseOut() {
      this.mouseOutTimer = setTimeout(() => {
        this.isVisible = false;
      }, 1000);
    },

    onClickOut(e) {
      if (
        !this.$el ||
        !this.referenceElement ||
        this.$el.contains(e.target) ||
        this.referenceElement.contains(e.target) ||
        !this.popperElement ||
        this.popperElement.contains(e.target)
      ) {
        return;
      }
      this.$emit("clickout");
      if (this.force) {
        return;
      }
      this.isVisible = false;
    }
  },

  created() {
    this.referenceElement = null;
    this.popperElement = null;
    this.popperJS = null;
  },
  mounted() {
    this.referenceElement =
      this.referenceElement || this.$slots.reference[0].elm;
    this.popperElement = this.$slots.default[1].elm.parentElement;
    CONTAINER.appendChild(this.popperElement);

    switch (this.trigger) {
      case "click":
        on(this.referenceElement, "click", this.toggle);
        on(document, "click", this.onClickOut);
        break;
      case "hover":
        on(this.referenceElement, "mouseover", this.onMouseOver);
        on(this.popperElement, "mouseover", this.onMouseOver);
        on(this.referenceElement, "mouseout", this.onMouseOut);
        on(this.popperElement, "mouseout", this.onMouseOut);
        break;
    }
  },
  beforeDestroy() {
    off(this.referenceElement, "click", this.toggle);
    off(this.referenceElement, "mouseout", this.onMouseOut);
    off(this.referenceElement, "mouseover", this.onMouseOver);
    off(document, "click", this.onClickOut);
    this.isVisible = false;
    if (this.popperElement) {
      CONTAINER.removeChild(this.popperElement);
    }
    console.log("distroyed23");
    this.destroyPopper();
  }
};
</script>

<style lang="stylus">
</style>
