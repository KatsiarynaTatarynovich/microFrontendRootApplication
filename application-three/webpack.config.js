const path = require("path");

module.exports = () => ({
  mode: "development",
  entry: "./src/qa-space-application-three.js",
  output: {
    filename: "qa-space-application-three.js",
    libraryTarget: "system",
    path: path.resolve(process.cwd(), "dist"),
    uniqueName: "application-three",
    devtoolNamespace: "application-three",
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
    port: 9003,
  },
  externals: ["single-spa", {}, "react-dom"],
  plugins: [],
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
    extensions: [".js", ".jsx", ".json"],
  },
});
