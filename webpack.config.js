const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = env => {

  const common = {
    entry: ['babel-polyfill','./build/index.js'],
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
    },
    node: {
      fs: 'empty',
      path: 'empty',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(html2json|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  require('babel-preset-env'), {
                  'targets': {
                    'browsers': ['last 2 versions'],
                    // 'node': 'current',
                  }
                }]
              ],
              plugins: [
                require('babel-plugin-transform-async-to-generator')
              ],
            }
          }
        }
      ]
    },
    plugins: []
  }

  const development = !env ? {
    devtool: 'source-map',
  } : {}

  const production = env && env.production ? {
    plugins: [
      ...common.plugins,
      new UglifyJSPlugin()
    ]
  } : {}

  console.log(production)

  return Object.assign({}, common, development, production)

}
