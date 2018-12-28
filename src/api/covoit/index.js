const controllers = require('./controllers');

const { Router: createRouter } = require('express');

module.exports = function register() {
  const router = createRouter();

  router.get('/:type', controllers.getByType);
  router.post('/', controllers.create);

  return router;
};
