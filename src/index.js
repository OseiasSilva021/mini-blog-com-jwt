const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/db');
const path = require('path');  // Para resolver caminhos de arquivos estáticos

const app = express();

// Conectar ao MongoDB
connectDB();

// Configurações de middleware
app.use(cors());
app.use(express.json());

// Serve arquivos estáticos da pasta 'uploads' para o frontend
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas de usuário e produto
app.use(userRoutes);
app.use(productRoutes);

// Iniciar servidor
app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});
