const webpack = require('webpack');
const baseConfig = require('./webpack.common.babel.js');
const path = require('path');
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
  entry: ['babel-polyfill', 'react-hot-loader/patch', './index.js'],
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, './dist/assets'),
    hot: true,
    lazy: false,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.module\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader?sourceMap', 'css-loader?importLoaders=1&module&localIdentName=[path]___[name]__[local]___[hash:base64:5]', 'sass-loader?paths[]=src']
      },
      {
        test: /^((?!\.module).)*\.scss/,
        exclude: /node_modules/,
        use: ['style-loader?sourceMap', 'css-loader?importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]', 'sass-loader?paths[]=src']
      },
      {
        test: /\.(jpg|png)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      }
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      'process.env.APIHOST': '"https://api.coinmarketcap.com"',
    })
  ]
});
