const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    path: path.join(__dirname, './dist/assets'),
    publicPath: '/',
    filename: 'bundle.js',
    sourceMapFilename: '[name].map'
  },
  context: path.resolve(__dirname, 'src'),
  resolve: {
    alias: {
      cmp: path.resolve(__dirname, './src/components/'),
      act: path.resolve(__dirname, './src/sagas/'),
      red: path.resolve(__dirname, './src/reducers/'),
      cmn: path.resolve(__dirname, './src/common/'),
      bsc: path.resolve(__dirname, './src/')
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Mint-Challenge',
      template: './index.html',
      filename: 'index.html',
      hash: true,
    })
  ]
};

