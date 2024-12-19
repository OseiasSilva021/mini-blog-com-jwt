const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Validação dos dados de entrada
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Função de criação de usuário
const createUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

// Função de login de usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) return res.status(400).json({ message: 'Senha incorreta' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
};

module.exports = { createUser, loginUser };
