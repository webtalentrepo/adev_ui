<doc>
  <nav class="ui-pagination ui-button-group ui-large ui-minimal">
    <button class="ui-button ui-icon-arrow-left"></button>
    <button class="ui-button">1</button>
    <button class="ui-button">2</button>
    <button class="ui-button">3</button>
    <button class="ui-button">8</button>
    <button class="ui-button ui-disabled">...</button>
    <button class="ui-button ui-icon-arrow-right"></button>
  </nav>
</doc>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    }
  },
  model: {
    prop: 'current',
    event: 'change'
  },

  render(h, context) {
    let validCurrent = Math.max(1, Math.min(this.current, this.total));

    if (validCurrent != this.current) {
      this.$emit('change', validCurrent);
      return null;
    }

    if (this.total == 1) {
      return null;
    }
    let upperBound = Math.min(this.total, this.current + 3);
    let lowerBound = Math.max(1, this.current - 3);

    let pages = [
      h('button', {
        staticClass: 'ui-button ui-icon-arrow-left',
        class: {
          'ui-disabled': this.current <= 1
        },
        on: {
          click: () => this.$emit('change', this.current - 1)
        }
      })
    ];
    if (lowerBound > 1) {
      pages.push(h('button', { staticClass: 'ui-button ui-disabled' }, `...`));
    }
    for (let i = lowerBound; i <= upperBound; i++) {
      pages.push(
        h(
          'button',
          {
            staticClass: 'ui-button',
            class: {
              'ui-active': this.current == i
            },
            on: {
              click: () => this.$emit('change', i)
            }
          },
          `${i}`
        )
      );
    }
    if (upperBound < this.total) {
      pages.push(h('button', { staticClass: 'ui-button ui-disabled' }, `...`));
    }
    pages.push(
      h('button', {
        staticClass: 'ui-button ui-icon-arrow-right',
        class: {
          'ui-disabled': this.current >= this.total
        },
        on: {
          click: () => this.$emit('change', this.current + 1)
        }
      })
    );
    return h(
      'nav',
      { staticClass: 'ui-pagination ui-minimal ui-button-group' },
      pages
    );
  }
};
</script>

<style lang="stylus">
.ui-pagination {
  .ui-button {
    outline: none !important;
  }

  .ui-disabled {
    cursor: default;
    pointer-events: none;
  }
}
</style>

