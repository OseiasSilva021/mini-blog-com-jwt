const Joi = require('joi');

// Middleware para validar a criação de usuários
const validateUser = (req, res, next) => {
  const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next(); // Se a validação passar, continua para a próxima função
};

// Middleware para validar a criação de produtos
const validateProduct = (req, res, next) => {
  const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
  });

  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next(); // Se a validação passar, continua para a próxima função
};

module.exports = { validateUser, validateProduct };
