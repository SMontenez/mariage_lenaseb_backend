const covoit = require('./covoit');
const email = require('./email');

const { Router: createRouter } = require('express');

module.exports = function register() {
  const router = createRouter();

  router.use('/covoit', covoit());
  router.use('/email', email());

  return router;
};
