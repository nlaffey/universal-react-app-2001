const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  context: path.resolve(__dirname),
  entry: "./src/server/createApp.tsx",
  output: {
    library: 'createApp',
    path: path.resolve(__dirname, "dist"),
    filename: "createApp.js",
    libraryTarget: 'umd'
  },
  module: {
    // configuration regarding modules
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader?configFileName=tsconfig.server.json"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "isomorphic-style-loader",
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              camelCase: true,
              localIdentName: "[hash:base64]"
            }
          },
          'postcss-loader'
        ]
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