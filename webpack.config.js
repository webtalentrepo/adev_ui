import path from 'path'
import glob from 'glob'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import WriteFilePlugin from 'write-file-webpack-plugin'

import { root } from './tasks/common'

export default ({ production = false } = {}) => {
  const plugins = [
    new WriteFilePlugin({
      test: /\.styl$/,
      log: false,
    }),
    production
      ? new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false,
        })
      : undefined,
    new ExtractTextPlugin({
      filename: getPath =>
        path.relative(
          root('./tests/demo/public/assets/scripts/'),
          root('./tests/demo/source/styles/components', getPath('[name].styl'))
        ),
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        production ? 'production' : 'development'
      ),
    }),
    production
      ? new webpack.optimize.UglifyJsPlugin({
          beautify: true,
          mangle: {
            screw_ie8: false,
            keep_fnames: false,
          },
          compress: {
            screw_ie8: false,
            warnings: false,
          },
          comments: false,
        })
      : undefined,
  ].filter(plugin => plugin)

  return {
    entry: glob.sync(root('./tests/demo/source/*.js')),
    output: {
      path: root('./tests/demo/public/assets/scripts/'),
      filename: '[name].js',
      publicPath: './assets/scripts/',
    },
    devtool: production ? 'nosources-source-map' : 'eval',
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': root('./')
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              js: 'buble-loader',
              stylus: ExtractTextPlugin.extract({
                use: 'raw-loader',
              }),
            },
          },
        },
        {
          test: /\.js$/,
          loader: 'buble-loader',
          exclude: /node_modules/,
          options: {
            objectAssign: 'Object.assign'
          }
        },
      ],
    },
    plugins,
  }
}
