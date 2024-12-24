const express = require('express');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { createUser, loginUser, getAllUsers, deleteUser, updateUser, getUserProfile, updateProfileImage, forgotPassword, resetPassword, loginRateLimiter } = require('../controllers/userController');
const { validateUser } = require('../middleware/validateMiddleware');
const authenticateToken = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const upload = require('../config/upload'); 
const User = require('../models/User');

const router = express.Router();



// Rota de registro de usuário com validação de dados
router.post('/users', validateUser, createUser);

// Rota de login de usuário
router.post('/login', loginRateLimiter, loginUser); 

// Rota para obter todos os usuários
router.get('/users', getAllUsers); 

// Rota para obter o perfil do usuário autenticado
router.get('/users/profile', authenticateToken, getUserProfile); 

// Rota para atualizar o perfil do usuário autenticado
router.put('/users/profile', authenticateToken, updateUser); // Agora, usa /profile

// Rota para deletar um usuário pelo ID
router.delete('/users/:id', deleteUser);

// Rota para upload de imagem de perfil (utilizando o multer)
router.put('/users/profile-image', authenticateToken, upload.single('profileImage'), updateProfileImage);

router.post('/forgot-password', forgotPassword);


// Rota para exibir o formulário de redefinição de senha (GET)
router.get('/reset-password/:token', async (req, res) => {
    const { token } = req.params;

    try {
      // Busca o usuário com o token de recuperação
      const user = await User.findOne({
        resetPasswordToken: token
      });

      if (!user) {
        return res.status(400).send('Token inválido');
      }

      // Em vez de renderizar uma view, retorne uma resposta JSON
      res.status(200).json({ message: 'Token válido. Você pode redefinir sua senha.', token });
    } catch (err) {
      res.status(500).send('Erro ao processar o token');
    }
});


  
  // Rota para redefinir a senha com o token (POST)
// Rota para redefinir a senha com o token (POST)
router.post('/reset-password/:token', resetPassword);


  
  
  module.exports = router;
