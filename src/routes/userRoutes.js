const express = require('express');
const { createUser, loginUser, getAllUsers, deleteUser, updateUser, getUserProfile, updateProfileImage } = require('../controllers/userController');
const { validateUser } = require('../middleware/validateMiddleware');
const authenticateToken = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configuração do Multer para upload de imagem
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));  // Caminho absoluto para a pasta 'uploads'
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName); // Gera o nome do arquivo
  }
});

const upload = multer({ storage });

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

module.exports = router;
