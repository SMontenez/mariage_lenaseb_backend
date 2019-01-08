const Joi = require('joi');
const createError = require('http-errors');

const { createSchema } = require('./schemas');

const { TYPES } = require('../../constants/covoit');
const covoit = require('../../models/covoit');

const INVALID_TYPE_ERROR = new Error('Invalid covoit type requested');

/**
 * Send an email to the receiver defined in config
 *
 * @param  {Object} req  - Express request
 * @param  {Object} res  - Express response
 * @param  {Object} next - Express next handler
 * @returns {void}
 */
async function getByType(req, res, next) {
  try {
    const { type } = req.params;

    if (!TYPES.includes(type)) {
      return next(createError(400, INVALID_TYPE_ERROR));
    }

    const covoits = await covoit.findByType(type);
    if (covoits.length === 0) {
      return res.status(404).send('No covoits');
    }
    return res.status(200).json({ result: covoits });
  } catch (err) {
    return next(err);
  }
}

/**
 * Send an email to the receiver defined in config
 *
 * @param  {Object} req  Express request
 * @param  {Object} res  Express response
 * @param  {Object} next - Express next handler
 * @returns {void}
 */
async function create(req, res, next) {
  try {
    const { error, value: covoitData } = Joi.validate(req.body, createSchema);

    if (error) {
      return next(error);
    }

    await covoit.create(covoitData);

    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getByType,
  create,
};
