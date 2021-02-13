const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack-common');

const index = new HtmlWebpackPlugin({
  template: './src/template/index.pug',
  filename: 'index.html',
  chunks: ['index']
});

module.exports = merge(common, {
  entry: {
    'index': "./src/js/index.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  mode: 'production',
  devtool: 'none',
  plugins: [
    index
  ]
});