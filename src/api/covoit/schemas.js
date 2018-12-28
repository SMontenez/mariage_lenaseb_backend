const Joi = require('joi');

const { types: ALLOWED_TYPES } = require('../../constants/covoit');

const phoneRegex = /^0[1-8]\d{8}$/;

const createSchema = Joi.object().keys({
  type: Joi.string()
    .valid(ALLOWED_TYPES)
    .required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  from: Joi.string().required(),
  to: Joi.string().required(),
  nbPlaces: Joi.number()
    .min(1)
    .max(6)
    .required(),
  date: Joi.string()
    .isoDate()
    .required(),
  contact: Joi.object()
    .keys({
      téléphone: Joi.string()
        .regex(phoneRegex)
        .allow(''),
      email: Joi.string()
        .email()
        .allow(''),
    })
    .required()
    .or('téléphone', 'email'),
});

module.exports = {
  createSchema,
};
