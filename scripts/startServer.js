global.APP_ROOT_PATH = require('path').resolve(__dirname, '../');
const http = require('http');
const port = process.env.PORT || 3000;

let server;

function createServer() {
  try {
    let createAppDistFile = '../dist/createApp.js';
    delete require.cache[require.resolve(createAppDistFile)];
    let createApp = require(createAppDistFile).default;
    server = http.createServer(createApp(port));
    server.listen(port, () => {
      console.log(`Listening on port: ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

function startServer() {
  if (server) {
    server.close(() => {
      console.log('Closing server');
      createServer();
    });
  } else {
    createServer();
  }
}

module.exports = startServer;