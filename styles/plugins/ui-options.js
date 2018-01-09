var stylus = require('stylus')
var nodes = stylus.nodes
var utils = stylus.utils

module.exports = () => {
  return s => {
    let output = (path, ...value) => {
      let reference = s.evaluator.global.lookup('ui-options')
      let keys = path.nodes[0].val.split('.')
      let i
      for (i = 0; i < keys.length - 1; i++) {
        let key = keys[i]
        if (!reference.nodes[0].vals[key]) {
          let expr = new nodes.Expression()
          expr.push(new nodes.Object())
          reference.nodes[0].vals[key] = expr
        }

        reference = reference.nodes[0].vals[key]
      }
      if (!reference.nodes[0].vals[keys[i]]) {
        if (value.length > 1) {
          let expr = new nodes.Expression()
          value.forEach(v => {
            expr.push(v)
          })
          expr.isList = true
          value = [expr]
        }
        reference.nodes[0].vals[keys[i]] = value[0]
      }
    }
    output.raw = true
    s.define('ui-option', output)
  }
}
