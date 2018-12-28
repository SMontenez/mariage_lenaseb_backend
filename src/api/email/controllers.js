const Joi = require('joi');

const { sendEmailSchema } = require('./schemas');

const config = require('../../config');
const emailLib = require('../../lib/email');

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
    const {
      error,
      value: { lastname, firstname, email: fromEmail, message },
    } = Joi.validate(req.body, sendEmailSchema);

    if (error) {
      return next(error);
    }

    const name = `${firstname} ${lastname}`;
    const { receiverAddress: toEmail } = config.email;

    let result;
    try {
      result = await emailLib.send(name, fromEmail, toEmail, message);
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
