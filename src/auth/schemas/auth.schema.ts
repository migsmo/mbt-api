import * as Joi from 'joi';

export const signInSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email is required.',
    'string.email': 'Email must be a valid email.',
  }),
  password: Joi.string().min(1).required().messages({
    'string.base': 'Password must be a string.',
    'string.empty': 'Password is required.',
    'string.min': 'Password must not be an empty string.',
  }),
});
