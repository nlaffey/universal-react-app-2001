const merge = require('webpack-merge');
const common = require('./webpack.client.common');
const LiveReloadPlugin = require('webpack-livereload-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const bundleAnalyzer = new BundleAnalyzerPlugin();

const liveReload = new LiveReloadPlugin({ appendScriptTag: true });

module.exports = merge(common, {
  plugins: [liveReload],
  watch: true
});