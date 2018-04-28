const http = require('http');
const SERVER_PORT_NUMBER = 3000;

let server;
function startServer() {
  let serverDistFilePath = '../dist/server.js';
  delete require.cache[require.resolve(serverDistFilePath)];
  const { setupApp } = require(serverDistFilePath);
  if (server) {
    server.close();
  }
  server = http.createServer(setupApp());
  server.listen(SERVER_PORT_NUMBER, () => {
    console.log(`Listening on port: ${SERVER_PORT_NUMBER}`);
  });
}

module.exports = startServer;