const Joi = require('joi');

const contactEmailSchema = Joi.object().keys({
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

const presenceEmailSchema = Joi.object().keys({
  lastname: Joi.string()
    .max(20)
    .required(),
  firstname: Joi.string()
    .max(20)
    .required(),
  presence: Joi.boolean().required(),
  message: Joi.string().empty(''),
  nbAdults: Joi.number().default(0),
  nbChildren: Joi.number().default(0),
});

module.exports = {
  contact: contactEmailSchema,
  presence: presenceEmailSchema,
};
