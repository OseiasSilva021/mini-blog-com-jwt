const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');
const { validateUser } = require('../middleware/validateMiddleware');

const router = express.Router();

// Rota de registro de usuário com validação de dados
router.post('/users', validateUser, createUser);

// Rota de login de usuário
router.post('/login', loginUser);

module.exports = router;
