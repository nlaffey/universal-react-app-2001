const serverConfig = require('../webpack.server.prod');
const clientConfig = require('../webpack.client.prod');

const { webpackWithLogging } = require('./runWebpack');
const startServer = require('./startServer');

webpackWithLogging(serverConfig, startServer);
webpackWithLogging(clientConfig);