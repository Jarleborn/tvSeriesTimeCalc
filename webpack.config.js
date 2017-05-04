const path = require('path')
const webpack = require('webpack')
const PROD = true

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },

  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ] : [],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
            'env',
          ],
        },
      },
      { test: /\.css$/, loader: 'style!css' }
    ],
  },
}
