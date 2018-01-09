<doc>
  <div>
    AccordionPanel
    AccordionPanelHeader
    AccordionPanelContent
  </div>
</doc>

<script>
export default {
  render(h) {
    let content = null
    if (this.$slots.default) {
      content = this.$slots.default.reduce((content, slot) => {
        if (slot.tag == 'AccordionPanel' && slot.children) {
          let isActive = slot.data && slot.data.attrs && slot.data.attrs.active
          let panelHeader = null, panelContent = null
          slot.children.forEach((node) => {
            if (node.children) {
              if (node.tag === 'AccordionPanelHeader') {
                panelHeader = h('div', { class: 'ui-accordion-panel-header' }, node.children)
              } else if (node.tag === 'AccordionPanelContent') {
                panelContent = h('div', { class: 'ui-accordion-panel-content' }, node.children)
              }
            }
          })
          if (panelHeader && panelContent) {
            content.push(h('div', {
              staticClass:  'ui-accordion-panel',
              class: {
                'is-active': isActive
              },
              key: slot.key
            }, [panelHeader, panelContent]))
          }
        }
        return content;
      }, []);
    }
    return h('div', {
      class: 'ui-accordion'
    }, content)
  }
}
</script>
<style lang="stylus">
.ui-accordion {
  box-shadow: 0 0 3px rgba(16, 22, 26, 0.15);
  background: #ebf1f5;
  border-radius: 5px;
  overflow: hidden;
  &.ui-dark,
  .ui-dark & {
    box-shadow: 0 0 3px rgba(16, 22, 26, 0.4);
    background: #293742;
    color: #f5f8fa;
  }
}
.ui-accordion-panel {
    display: flex;
    flex-direction: column;
}

.ui-accordion-panel-header {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  background: #ffffff;
  padding: 10px;
  box-shadow: inset 0 -1px 0 rgba(16, 22, 26, 0.15);
  .is-active & {
    box-shadow: 0 1px 0 rgba(16, 22, 26, 0.15);
  }
  .ui-dark .is-active & {
    box-shadow: 0 1px 0 rgba(16, 22, 26, 0.4);
  }
  .ui-dark & {
    box-shadow: inset 0 -1px 0 rgba(16, 22, 26, 0.4);
    background: #30404d;
  }
}

.ui-accordion-panel-content {
  display: none;
  flex: 1 1 auto;
  padding: 10px;
  line-height: 18px;
  box-shadow: inset 0 -1px 5px 0 rgba(16, 22, 26, 0.15);
  .is-active & {
    display: block;
  }
  .ui-dark & {
    box-shadow: inset 0 -1px 5px 0 rgba(16, 22, 26, 0.3);
  }
}
</style>
