const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv) => ({
  mode: "development",
  entry: "./src/report-portal-root-config.js",
  output: {
    filename: "report-portal-root-config.js",
    libraryTarget: "system",
    path: path.resolve(process.cwd(), "dist"),
    uniqueName: "root-config",
    devtoolNamespace: "root-config",
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
      },
      { parser: { system: false } },
    ],
  },
  devtool: "source-map",
  devServer: {
    compress: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    port: 9000,
  },
  externals: ["single-spa", {}],
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: "src/index.ejs",
      templateParameters: {
        isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
        orgName: "report-portal",
      },
    }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
    extensions: [".js", ".jsx", ".json"],
  },
});
