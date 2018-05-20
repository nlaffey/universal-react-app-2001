const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.client.common.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const uglifyJs = new UglifyJSPlugin();

module.exports = merge(common, {
  plugins: [uglifyJs]
});