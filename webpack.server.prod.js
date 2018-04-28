const merge = require('webpack-merge');
const common = require('./webpack.server.common');
const webpack = require('webpack');

const define = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
});

module.exports = merge(common, {
  plugins: [define]
});