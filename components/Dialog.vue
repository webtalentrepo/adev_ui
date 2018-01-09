
<script>
export default {
  name: 'Dialog',
  methods: {},
  render(h) {
    let body = h('div', { class: 'ui-dialog-body' }, [])
    let header = null, footer = null
    this.$slots.default.forEach(node => {
      if (node.children && node.tag == 'DialogHeader') {
        header = h('div', { class: 'ui-dialog-header' }, [])

        if (node.data && node.data.attrs && node.data.attrs.icon) {
          header.children.push(h('span', { class: `ui-icon-large ui-icon-${node.data.attrs.icon}` }))
        }

        header.children.push(h('h5', node.children))

        if (node.data && node.data.attrs && node.data.attrs.showClose) {
          header.children.push(h('button', {
            class: 'ui-dialog-close-button ui-icon-small-cross',
            attrs: { 'aria-label': 'Close' },
            on: { 'click': () => { this.$emit('close') } }
          }))
        }
      } else if (node.children && node.tag == 'DialogFooter') {
        footer = h('div', { class: 'ui-dialog-footer' }, [h('div', { class: 'ui-dialog-footer-actions' }, node.children)])
      } else {
        body.children.push(node)
      }
    })
    return h('div', { class: 'ui-dialog' }, [header, body, footer])
  }
}
</script>
<style lang="stylus">
.ui-dialog {
  display: flex;
  flex-direction: column;
  width: 500px;
  border-radius: 6px;
  background: #ebf1f5;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 4px 8px rgba(16, 22, 26, 0.2), 0 18px 46px 6px rgba(16, 22, 26, 0.2);
  padding-bottom: 20px;
}

.ui-dialog:focus {
    outline: 0;
}

.ui-dialog.ui-dark,
.ui-dark .ui-dialog {
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.2), 0 4px 8px rgba(16, 22, 26, 0.4), 0 18px 46px 6px rgba(16, 22, 26, 0.4);
  background: #293742;
  color: #f5f8fa;
}

.ui-dialog-header {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  border-radius: 6px 6px 0 0;
  box-shadow: 0 1px 0 rgba(16, 22, 26, 0.15);
  background: #ffffff;
  min-height: 40px;
  padding-left: 20px;
}

.ui-dialog-header .ui-icon-large {
  flex: 0 0 auto;
  margin-right: 10px;
  color: #5c7080;
}

.ui-dialog-header h5 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  flex: 1 1 auto;
  margin: 0;
  line-height: inherit;
}

.ui-dialog-header h5:last-child {
  margin-right: 20px;
}

.ui-dark .ui-dialog-header {
  box-shadow: 0 1px 0 rgba(16, 22, 26, 0.4);
  background: #30404d;
}

.ui-dark .ui-dialog-header .ui-icon-large {
  color: #bfccd6;
}

.ui-dark .ui-dialog-header h5 {
  color: #f5f8fa;
}

.ui-dialog-close-button {
  line-height: 1;
  font-family: "Icons20", sans-serif;
  font-size: 20px;
  font-weight: 400;
  font-style: normal;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #5c7080;
  flex: 0 0 auto;
  border: none;
  background: none;
  cursor: pointer;
  padding: 10px;
}

.ui-dialog-close-button:hover {
  color: #182026;
}

.ui-dark .ui-dialog-close-button {
  color: #bfccd6;
}

.ui-dark .ui-dialog-close-button:hover {
  color: #f5f8fa;
}

.ui-dialog-body {
  flex: 1 1 auto;
  margin: 20px;
  line-height: 18px;
}

.ui-dialog-footer {
  flex: 0 0 auto;
  margin: 0 20px;
}

.ui-dialog-footer-actions {
  display: flex;
  justify-content: flex-end;
}

.ui-dialog-footer-actions .ui-button {
  margin-left: 10px;
}
</style>
