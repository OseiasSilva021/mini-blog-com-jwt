const express = require('express');
const { createUser, loginUser, getAllUsers, deleteUser, updateUser} = require('../controllers/userController');
const { validateUser } = require('../middleware/validateMiddleware');

const router = express.Router();

// Rota de registro de usuário com validação de dados
router.post('/users', validateUser, createUser);

// Rota de login de usuário
router.post('/login', loginUser);

router.get('/users', getAllUsers);

// Rota para deletar um usuário pelo ID
router.delete('/users/:id', deleteUser);

// Rota para atualizar um usuário pelo ID
router.put('/users/:id', updateUser);



module.exports = router;
