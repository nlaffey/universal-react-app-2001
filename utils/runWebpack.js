const webpack = require('webpack');
const weblog = require('webpack-log');
const path = require('path');
const clientLog = weblog({ name: 'client' });
const clientConfig = require('../webpack.config');
const serverConfig = require('../webpack.server.config');
const http = require('http');

const SERVER_PORT_NUMBER = 3000;
global.appRootPath = path.resolve(__dirname, '../');

let server;

const runWebpack = async (config, initServer) => {
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.watch(null, (err, stats) => {
      if (err) {
        clientLog.error(err.stack || err);
        if (err.details) {
          clientLog.error(err.details);
        }
        reject(err);
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        clientLog.error(info.errors);
      }

      if (stats.hasWarnings()) {
        clientLog.warn(info.warnings);
        resolve(compiler);
      }
      console.log(stats.toString({
        chunks: true,
        colors: true,
        assets: false
      }));

      if (initServer) {
        startServerAndListen();
      }

      resolve(compiler);

    });
  });
};


function startServerAndListen(serverCompiler) {
  let serverDistFilePath = '../dist/server.js';
  delete require.cache[require.resolve(serverDistFilePath)];
  const { setupApp } = require(serverDistFilePath);
  if (server) {
    server.close();
  }
  server = http.createServer(setupApp(serverCompiler));
  server.listen(SERVER_PORT_NUMBER, () => {
    console.log(`Listening on port: ${SERVER_PORT_NUMBER}`);
  });
}



runWebpack(serverConfig, true);
runWebpack(clientConfig, false);