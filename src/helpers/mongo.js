const { MongoClient } = require('mongodb');

const config = require('../config');

const DB_NAME = 'mariage_lenaseb';

let _db;

/**
 * Return db connector if already connected, otherwise open connection and return connector
 *
 * @returns {object} database connector
 */
async function connect() {
  if (_db) {
    return _db;
  }

  const client = await MongoClient.connect(
    config.mongo.url,
    { useNewUrlParser: true },
  );
  _db = client.db(DB_NAME);
  return _db;
}

module.exports = {
  connect,
};
