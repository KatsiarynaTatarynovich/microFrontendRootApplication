const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/rootApplication.js',
  output: {
    publicPath: 'http://localhost:9000/'
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 9000,
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  plugins: [
    new CopyPlugin([
      { from: 'img', to: 'img' },
    ]),
    new ModuleFederationPlugin({
      name: 'rootApplication',
      library: { type: 'var', name: 'rootApplication' },
      filename: 'rootApplication.js',
      remotes: {
        applicationOne: 'applicationOne',
        applicationTwo: 'applicationTwo',
      },
      exposes: {
        './commonImages': './src/commonImages'
      },
      shared: []
    }),
    new HtmlWebpackPlugin({ template: './index.html' })
  ],
};
