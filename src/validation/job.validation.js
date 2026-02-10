const Joi = require("joi");

/**
 * Job schema validation
 */
const jobSchema = Joi.object({
  title: Joi.string().max(150).required(),
  company: Joi.string().max(150).required(),
  location: Joi.string().max(120).allow(null, ""),
  employment_type: Joi.string().max(50).allow(null, ""),
  seniority_level: Joi.string().max(50).allow(null, ""),
  remote: Joi.boolean(),
  salary_min: Joi.number().integer().min(0).allow(null),
  salary_max: Joi.number().integer().min(0).allow(null),
  currency: Joi.string().max(10),
  experience_min: Joi.number().integer().min(0).allow(null),
  skills: Joi.array().items(Joi.string()),
  description: Joi.string().allow(null, ""),
});

module.exports = { jobSchema };
