const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    resolve(__dirname, 'src', 'index.jsx')
  ],
//   react-hot-loader/patch activates hot module replacement.
//
// webpack-dev-server/client?http://localhost:8080' connects to the necessary endpoint (our project will be served at localhost:8080).
//
// webpack/hot/only-dev-server instructs Webpack to bundle our code, then provide it to the development server if/when bundling is successful
  output: {
    filename: 'app.bundle.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/'
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: '#source-map',
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'build'),
    publicPath: '/'
  },
  module:{
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            ["es2015", {"modules": false}],
            "react"
          ],
          plugins: [
            "react-hot-loader/babel"
          ]
        }
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'template.ejs',
      appMountId: 'react-app-root',
      title: 'queue tab',
      filename: resolve(__dirname, 'build', 'index.html'),
    }),
  ]

};
