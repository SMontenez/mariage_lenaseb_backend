const Joi = require('joi');

const sendEmailSchema = Joi.object().keys({
  name: Joi.string()
    .max(20)
    .required(),
  senderEmail: Joi.string()
    .email()
    .required(),
  content: Joi.string().required(),
});

module.exports = {
  sendEmailSchema,
};
