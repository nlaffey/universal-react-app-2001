const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  context: path.resolve(__dirname),
  entry: "./src/server.tsx",
  output: {
    library: 'appServer',
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
    libraryTarget: 'umd'
  },
  module: {
    // configuration regarding modules
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
  // target: "node",
  devtool: "source-map",
  externals: [nodeExternals()]
};