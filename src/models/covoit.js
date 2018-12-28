const mongo = require('../helpers/mongo');

const COLLECTION = 'covoit';

/**
 * Get connector to covoit collection
 *
 * @returns {object} connector to collection
 */
async function collection() {
  const db = await mongo.connect();
  return db.collection(COLLECTION);
}

/**
 * Get all covoits with a specific type
 *
 * @param {string} type - either 'proposal' or 'request'
 * @returns {array} all covoits with the requested type
 */
async function findByType(type) {
  return (await collection())
    .find({
      type,
    })
    .toArray();
}

/**
 * Create a covoit in database
 *
 * @param {object} data - data
 * @returns {array} all covoits with the requested type
 */
async function create(data) {
  return (await collection()).insertOne(data);
}

module.exports = {
  findByType,
  create,
};
