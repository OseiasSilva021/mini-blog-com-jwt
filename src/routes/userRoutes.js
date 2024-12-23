const express = require('express');
const { createUser, loginUser, getAllUsers, deleteUser, updateUser, getUserProfile, updateProfileImage, forgotPassword, resetPassword } = require('../controllers/userController');
const { validateUser } = require('../middleware/validateMiddleware');
const authenticateToken = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const upload = require('../config/upload'); 

const router = express.Router();



// Rota de registro de usuário com validação de dados
router.post('/users', validateUser, createUser);

// Rota de login de usuário
router.post('/login', loginUser);

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

// Rota para redefinir a senha com o token enviado por e-mail
router.post('/reset-password', resetPassword);

module.exports = router;
