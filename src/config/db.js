const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose
    .connect(process.env.MONGO_URI) // Simplificado para remover opções obsoletas
    console.log('Conectado ao MongoDB!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB', err);
    process.exit(1); // Sair se não conseguir conectar
  }
};

module.exports = connectDB;
