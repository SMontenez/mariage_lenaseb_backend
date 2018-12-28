const http = require('http');

const express = require('./config/express');
const mongo = require('./helpers/mongo');

const app = express();
const server = http.createServer(app);

require('./config/express')(app);

/**
 * Start the server with Express
 *
 * @returns {void}
 */
async function start() {
  await server.listen(app.get('port'));
  await mongo.connect();
}

if (!module.parent) {
  start()
    .then(() => {
      console.log(`Server started, listening on port ${server.address().port}`); // eslint-disable-line no-console
    })
    .catch((err) => {
      console.log('ERROR !!!', err); // eslint-disable-line no-console
      process.exit(1);
    });
}
