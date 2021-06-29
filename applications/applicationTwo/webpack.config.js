const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/applicationTwo.js',
  output: {
    publicPath: 'http://localhost:9002/'
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9002,
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
      name: 'applicationTwo',
      library: { type: 'var', name: 'applicationTwo' },
      filename: 'applicationTwo.js',
      remotes: {
        rootApplication: 'rootApplication',
      },
      exposes: {
        './ApplicationTwo': './src/applicationTwo',
        './Image': './src/components/image/image'
      },
      shared: ['react', 'react-dom', 'single-spa-react']
    }),
    new HtmlWebpackPlugin({ template: './index.html' })
  ],
};
