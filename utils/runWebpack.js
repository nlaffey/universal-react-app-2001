const webpack = require('webpack');
const weblog = require('webpack-log');
const path = require('path');
const clientLog = weblog({ name: 'client' });

global.appRootPath = path.resolve(__dirname, '../');


const logging = (config, err, stats, callback) => {

  if (err) {
    clientLog.error(err.stack || err);
    if (err.details) {
      clientLog.error(err.details);
    }
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    clientLog.error(info.errors);
  }

  if (stats.hasWarnings()) {
    clientLog.warn(info.warnings);
  }

  console.log(stats.toString({
    chunks: true,
    colors: true,
    assets: false
  }));

  if (callback) callback();
};

const webpackWatchWithLogging = (config, callback) => {
  webpack(config).watch(null, (err, stats) => {
    logging(config, err, stats, callback);
  });
};

const webpackWithLogging = (config, callback) => {
  webpack(config, (err, stats) => {
    logging(config, err, stats, callback)
  })
};

// noinspection WebpackConfigHighlighting
module.exports = {
  webpackWatchWithLogging,
  webpackWithLogging
};