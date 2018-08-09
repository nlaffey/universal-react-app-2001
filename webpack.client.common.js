const path = require('path');

module.exports = {
  context: path.resolve(__dirname),
  entry: "./src/client/clientEntry.ts",
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
      },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
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
    extensions: [".ts", ".json", ".tsx", ".css", ".js", ".jsx"]
  },
  devtool: "source-map",
  target: "web",
};