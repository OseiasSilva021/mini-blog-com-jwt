const Post = require('../models/Post');

// Função para criar um novo post
const createPost = async (req, res) => {
  const { title, author, content } = req.body;

  try {
    const post = await Post.create({ title, author, content });
    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar post' });
  }
};

// Função para listar todos os posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter posts' });
  }
};

module.exports = { createPost, getPosts };
