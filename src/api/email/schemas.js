const Joi = require('joi');

const sendEmailSchema = Joi.object().keys({
  name: Joi.string()
    .max(20)
    .required(),
  content: Joi.string().required(),
});

module.exports = {
  sendEmailSchema,
};
