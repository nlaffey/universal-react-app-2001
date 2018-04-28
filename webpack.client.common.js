const path = require('path');

module.exports = {
  context: path.resolve(__dirname),
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/public"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader?configFileName=tsconfig.json",
        options: {
          presets: ["es2015"]
        }
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules"
    ],
    extensions: [".ts", ".json", ".tsx", ".css", ".js", ".jsx"]
  },
  devtool: "source-map",
  target: "web",
};