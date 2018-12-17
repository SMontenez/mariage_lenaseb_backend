const controllers = require('./controllers');

const { Router: createRouter } = require('express');

module.exports = function register() {
  const router = createRouter();

  router.post('/send', controllers.send);

  return router;
};
