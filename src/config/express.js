const express = require('express');
const bodyParser = require('body-parser');
const statusCodes = require('http-status-codes');

const config = require('.');
const registerApi = require('../api');

/**
 * Express post swagger registration configuration
 *
 * @param {Express} app Express application instance
 * @return {void} void
 */
function postConfig(app) {
  /**
   * Note: the last argument `next` is important because if its not present, the function
   * will not be called at all.
   */
  /* istanbul ignore next */ /* eslint-disable-next-line no-unused-vars */
  app.use((err, req, res, next) => {
    if (typeof err !== 'object') {
      // If the object is not an Error, create a representation that appears to be
      err = {
        // eslint-disable-line no-param-reassign
        status: statusCodes.INTERNAL_SERVER_ERROR,
        message: String(err), // Coerce to string
      };
    } else {
      // Ensure that err.message is enumerable (It is not by default)
      Object.defineProperty(err, 'message', { enumerable: true });
      Object.defineProperty(err, 'status', {
        enumerable: true,
        value: err.status || statusCodes.INTERNAL_SERVER_ERROR,
      });
    }

    if (err.status === statusCodes.INTERNAL_SERVER_ERROR) {
      console.log({ err }, '[Express#ErrorHandler] Internal server error');
    }

    const errorBody = {
      message: err.message,
      status: err.status,
    };
    // If we have a server error, then we need to obfuscate its details in the
    // response.
    if (err.status === statusCodes.INTERNAL_SERVER_ERROR) {
      errorBody.message = 'Internal Server Error';
    }

    /* istanbul ignore next */
    return res.status(err.status).json(errorBody);
  });

  return app;
}

/**
 * Start the server with Express
 *
 * @returns {void}
 */
function setup() {
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

  postConfig(app);

  return app;
}

module.exports = setup;
