const http = require('http');
const port = process.env.PORT || 3000;

let server;

function createServer() {
  let serverDistFilePath = '../dist/server.js';
  delete require.cache[require.resolve(serverDistFilePath)];
  const { setupApp } = require(serverDistFilePath);
  server = http.createServer(setupApp(port));
  server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
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