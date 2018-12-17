const Joi = require('joi');

const { sendEmailSchema } = require('./schemas');

const config = require('../../config');
const emailLib = require('../../lib/email');

/**
 * Send an email to the receiver defined in config
 *
 * @param  {Object}   req  Express request
 * @param  {Object}   res  Express response
 * @returns {void}
 */
async function send(req, res) {
  const {
    error,
    value: { name, content },
  } = Joi.validate(req.body, sendEmailSchema);

  if (error) {
    return res.status(400).json({ err: error.name, details: error.details });
  }

  const { receiverAddress } = config.email;

  let result;
  try {
    result = await emailLib.send(name, receiverAddress, content);
  } catch (err) {
    return res.status(500).json({ err });
  }

  return res.status(200).json({ result });
}

module.exports = {
  send,
};
