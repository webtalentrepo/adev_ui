import gulp from 'gulp'
import stylus from 'gulp-stylus'
import rupture from 'rupture'
import stylusUnits from 'stylus-units'
import stylusSymetra from 'stylus-symetra'
import stylusVerticalGrid from 'stylus-vertical-grid'
import postcss from 'gulp-postcss'
import rucksack from 'rucksack-css'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import mqpacker from 'css-mqpacker'
import styleGuide from 'postcss-style-guide'
import uniqueSelectors from 'postcss-unique-selectors'
import combineDuplicatedSelectors from 'postcss-combine-duplicated-selectors'
import mergeLonghand from 'postcss-merge-longhand'
import mergeSelectors from 'postcss-merge-selectors'
import sourcemaps from 'gulp-sourcemaps'

import { isProduction, onError, noop, root } from './common'

let postCSSPlugins = [
  rucksack(),
  // styleGuide({
  //   project: "Sendlane UI",
  //   themePath: "./node_modules/psg-theme-1column",
  //   dest: "./public/styleguide.html"
  // })
]

if (isProduction) {
  postCSSPlugins.push(
    mergeLonghand(),
    autoprefixer({ browsers: ['last 1 version'] }),
    mqpacker(),
    uniqueSelectors(),
    combineDuplicatedSelectors(),
    mergeSelectors(),
    cssnano()
  )
}

export default function styles() {
  return gulp
    .src(root('./tests/demo/source/styles/*.styl'))
    .pipe(sourcemaps.init())
    .pipe(
      stylus({
        include: ['./node_modules/'],
        use: [rupture(), stylusUnits(), stylusSymetra(), stylusVerticalGrid()],
      })
    )
    .on('error', onError)
    .pipe(postcss(postCSSPlugins))
    .on('error', onError)
    .pipe(isProduction ? noop() : sourcemaps.write())
    .pipe(gulp.dest(root('./tests/demo/public/assets/styles/')))
}
