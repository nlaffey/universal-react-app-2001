const merge = require('webpack-merge');
const common = require('./webpack.server.common');

module.exports = merge(common, {
  watch: true,
});