const clientDevConfig = require('../webpack.client.dev');
const serverConfig = require('../webpack.server.dev');
const { webpackWatchWithLogging } = require('./runWebpack');
const startServer = require('./startServer');

webpackWatchWithLogging(clientDevConfig);
webpackWatchWithLogging(serverConfig, startServer);