const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/db');

const app = express();

// Conectar ao MongoDB
connectDB();

// Configurações de middleware
app.use(cors());
app.use(express.json());

// Serve arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use(userRoutes);
app.use(productRoutes);

// Iniciar servidor
app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});
