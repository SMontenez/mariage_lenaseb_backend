const Joi = require('joi');
const createError = require('http-errors');

const schemas = require('./schemas');

const config = require('../../config');
const { TYPES } = require('../../constants/email');
const emailLib = require('../../lib/email');

const INVALID_TYPE_ERROR = new Error('Invalid email type requested');

/**
 * Send an email to the receiver defined in config
 *
 * @param  {Object} req  - Express request
 * @param  {Object} res  - Express response
 * @param  {Object} next - Express next handler
 * @returns {void}
 */
async function send(req, res, next) {
  try {
    const { type } = req.params;

    if (!TYPES.includes(type)) {
      return next(createError(400, INVALID_TYPE_ERROR));
    }
    const { error, value: emailPayload } = Joi.validate(req.body, schemas[type]);

    if (error) {
      return next(error);
    }

    const { receiverAddress: toEmail } = config.email;

    let result;
    try {
      result = await emailLib.send(type, emailPayload, toEmail);
    } catch (err) {
      return next(err);
    }

    return res.status(200).json({ result });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  send,
};
