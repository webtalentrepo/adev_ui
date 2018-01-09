import gulp from 'gulp'
import env from 'gulp-env'

import scripts from './tasks/scripts'
import server from './tasks/server'
import styles from './tasks/styles'
import { svg, images } from './tasks/images'
import markup from './tasks/markup'
import fonts from './tasks/fonts'

import { root } from './tasks/common'

env('.env.json')

gulp.task(
  'compile',
  gulp.parallel(gulp.series(scripts, styles), markup, fonts, images, svg)
)

gulp.task('watch', () => {
  gulp.watch('./icons/*.svg', svg)
  gulp.watch('./tests/demo/source/fonts/**/*', fonts)
  gulp.watch(['./tests/demo/source/styles/**/*.styl', './styles/**/*.{styl,js}'], styles)
  gulp.watch('./tests/demo/source/markup/**/*.pug', markup)
  gulp.watch('./tests/demo/source/images/**/*', images)
})

gulp.task(
  'default',
  gulp.series(
    markup,
    fonts,
    images,
    svg,
    styles,
    gulp.parallel('watch', server)
  )
)
