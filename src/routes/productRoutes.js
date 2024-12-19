const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware');
const { validateProduct } = require('../middleware/validateMiddleware');

const router = express.Router();

// Rota de criação de produto com autenticação e validação de dados
router.post('/products', authenticateToken, validateProduct, createProduct);

// Rota para listar todos os produtos (não requer autenticação)
router.get('/products', getProducts);

module.exports = router;
