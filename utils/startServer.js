const http = require('http');
const SERVER_PORT_NUMBER = process.env.PORT || 3000;

let server;

function createServer() {
  let serverDistFilePath = '../dist/server.js';
  delete require.cache[require.resolve(serverDistFilePath)];
  const { setupApp } = require(serverDistFilePath);
  server = http.createServer(setupApp());
  server.listen(SERVER_PORT_NUMBER, () => {
    console.log(`Listening on port: ${SERVER_PORT_NUMBER}`);
  });
}

function startServer() {
  if (server) {
    server.close(() => {
      console.log('!!!Closing server!!!');
      createServer();
    });
  } else {
    createServer();
  }

}

module.exports = startServer;