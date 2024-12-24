const express = require('express');
const router = express.Router();
const { createPost, getPosts } = require('../controllers/postController');

// Rota para criar um novo post
router.post('/posts', createPost);

// Rota para listar todos os posts
router.get('/posts', getPosts);

module.exports = router;
