const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const registerApi = require('./api');

/**
 * Start the server with Express
 *
 * @returns {void}
 */
async function start() {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, X-Request-Token',
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    if (req.method === 'OPTIONS') {
      return res.send();
    }

    return next();
  });

  app.set('port', config.port);
  app.use('/api', registerApi());

  const server = http.createServer(app);

  await server.listen(config.port);

  return config.port;
}

if (!module.parent) {
  start()
    .then((port) => {
      console.log(`Server started, listening on port ${port}`); // eslint-disable-line no-console
    })
    .catch((err) => {
      console.log('ERROR !!!', err); // eslint-disable-line no-console
    });
}
