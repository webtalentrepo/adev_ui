import gulp from 'gulp'
import pug from 'gulp-pug'
import { onError } from './common'

export default function markup() {
  return gulp
    .src('./tests/demo/source/markup/*.pug')
    .pipe(
      pug({
        pretty: true,
      })
    )
    .on('error', onError)
    .pipe(gulp.dest('./tests/demo/public/'))
}
