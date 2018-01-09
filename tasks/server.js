import fs from 'fs'
import path from 'path'
import browserSync from 'browser-sync'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import { root, isProduction } from './common'

import webpackConfig from '../webpack.config'
const config = webpackConfig({ production: isProduction })

config.entry.unshift('webpack/hot/dev-server', 'webpack-hot-middleware/client')

const compiler = webpack(config)

export default function server(done) {
  browserSync({
    open: false,
    notify: false,
    logFileChanges: false,
    server: {
      baseDir: root('./tests/demo/public/'),
      middleware: [
        webpackDevMiddleware(compiler, {
          publicPath: '/assets/scripts/',
          noInfo: false,
          quiet: false,
          stats: {
            chunks: false,
            colors: true,
          },
        }),
        webpackHotMiddleware(compiler),
      ],
    },
    files: [root('./tests/demo/public/assets/styles/*.css')],
  })
  done()
}
