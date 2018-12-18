const Joi = require('joi');

const sendEmailSchema = Joi.object().keys({
  lastname: Joi.string()
    .max(20)
    .required(),
  firstname: Joi.string()
    .max(20)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  message: Joi.string().required(),
});

module.exports = {
  sendEmailSchema,
};
