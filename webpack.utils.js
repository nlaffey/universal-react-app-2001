/**
 * Webpack configuration for things that are outside of the normal day to day development functions
 */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  context: path.resolve(__dirname),
  entry: { updateTypings: "./utils/updateContentfulTypings.ts" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader?configFileName=tsconfig.server.json"
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules"
    ],
    extensions: [".ts", ".json", ".tsx", ".js", ".jsx"]
  },
  target: "node",
  devtool: "source-map",
  externals: [nodeExternals()]
};