const http = require('http');
const port = process.env.PORT || 3000;

let server;

function createServer() {
  try {
    let serverDistFilePath = '../dist/server.js';
    delete require.cache[require.resolve(serverDistFilePath)];
    const { setupApp } = require(serverDistFilePath);
    server = http.createServer(setupApp(port));
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
      console.log('!!!Closing server!!!');
      createServer();
    });
  } else {
    createServer();
  }

}

module.exports = startServer;