import syncy from 'syncy'

export default function fonts() {
  return syncy('./tests/demo/source/fonts/**', './tests/demo/public/assets/fonts', {
    base: './tests/demo/source/fonts/',
  })
}

