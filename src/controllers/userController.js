const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt')

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

  const isValidPassword = await user.matchPassword(password);
  if (!isValidPassword) return res.status(400).json({ message: 'Senha incorreta' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclui o campo senha
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar se o ID é válido (no caso do MongoDB)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    // Tentar deletar o usuário
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Usuário deletado com sucesso', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o usuário', error });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, password } = req.body;

  try {
    // Verificar se o ID é válido
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    // Criar um objeto para armazenar os campos atualizados
    const updateData = {};

    if (name) {
      // Validar o nome
      if (name.length < 3) {
        return res.status(400).json({ message: 'O nome deve ter pelo menos 3 caracteres' });
      }
      updateData.name = name;
    }

    if (password) {
      // Validar e criptografar a nova senha
      if (password.length < 6) {
        return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
      }
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    // Atualizar o usuário no banco de dados
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Usuário atualizado com sucesso', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o usuário', error });
  }
};

module.exports = { createUser, loginUser, getAllUsers, deleteUser, updateUser };


