const email = require('./email');

const { Router: createRouter } = require('express');

module.exports = function register() {
  const router = createRouter();

  router.use('/email', email());

  return router;
};
