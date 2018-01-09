import webpack from 'webpack'

import { isProduction } from './common'

import webpackConfig from '../webpack.config'
const config = webpackConfig({ production: isProduction })

export default function scripts(done) {
  webpack(config, (err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
    } else {
      const info = stats.toJson()

      if (stats.hasErrors()) {
        console.error(info.errors)
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings)
      }
      console.log(
        stats.toString({
          chunks: false,
          colors: true,
        })
      )
    }
    done()
  })
}
