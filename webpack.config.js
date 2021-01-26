const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const SRC_DIR = path.join(__dirname, "/client/src");
const DIST_DIR = path.join(__dirname, "/public/dist");

module.exports = (env, argv) => ({
  devtool: "source-map",
  mode: argv.mode,
  entry: {
    main: path.join(SRC_DIR, "index.jsx"),
  },
  output: {
    path: DIST_DIR,
    filename: "bundle.js",
    sourceMapFilename: "source.js.map",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env", "@babel/preset-react"] },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [new CleanWebpackPlugin()],
});
