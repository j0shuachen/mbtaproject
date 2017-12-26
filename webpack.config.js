var path = require("path");
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: "./index.js",
  output: {
    filename: "./lib/bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/.jsx?$/, /.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },

      },
      {
       test: /\.csv$/,
       loader: 'dsv-loader'
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*", "csv"]
  },

};
