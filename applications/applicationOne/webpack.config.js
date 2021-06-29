const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: {},
  output: {
    publicPath: 'http://localhost:9001/'
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9001,
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
  optimization: {
    minimize: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'applicationOne',
      library: { type: 'var', name: 'applicationOne' },
      filename: 'applicationOne.js',
      remotes: {
        rootApplication: 'rootApplication',
        applicationTwo: 'applicationTwo'
      },
      exposes: {
        './ApplicationOne': './src/applicationOne'
      },
      shared: ['react', 'react-dom', 'single-spa-react']
    }),
    new HtmlWebpackPlugin({ template: './index.html' })
  ],
};
