const merge = require('webpack-merge');
const clientCommon = require('./webpack.client.common');
const LiveReloadPlugin = require('webpack-livereload-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const bundleAnalyzer = new BundleAnalyzerPlugin();

const liveReload = new LiveReloadPlugin({ appendScriptTag: true });

module.exports = merge(clientCommon, {
  plugins: [liveReload],
  watch: true
});