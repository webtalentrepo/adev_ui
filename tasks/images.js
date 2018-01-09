import gulp from 'gulp'
import path from 'path'
import syncy from 'syncy'
import svgstore from 'gulp-svgstore'
import svgmin from 'gulp-svgmin'
import debounce from 'lodash.debounce'
import { exec } from 'child_process'

import { isProduction, onError, root } from './common'

const imageOptim = debounce(function() {
  exec(
    './node_modules/.bin/imageOptim -d ./tests/demo/public/assets/images/ -a',
    (err, stdout, stderr) => {
      console.log(stdout.trim())
      console.error(stderr.trim())
    }
  )
}, 200)

export function svg() {
  return gulp
    .src('./icons/*.svg')
    .pipe(
      svgmin(file => {
        const prefix = path.basename(file.relative, path.extname(file.relative))
        return {
          plugins: [
            {
              cleanupIDs: {
                prefix: prefix + '-',
                minify: true,
              },
            },
          ],
        }
      })
    )
    .pipe(svgstore())
    .pipe(gulp.dest(root('./tests/demo/public/assets/images/')))
}

export function images() {
  return syncy('./tests/demo/source/images/**', './tests/demo/public/assets/images', {
    base: './tests/demo/source/images/',
  })
    .then(() => {
      if (isProduction) {
        imageOptim()
      }
    })
    .catch(console.error)
}
