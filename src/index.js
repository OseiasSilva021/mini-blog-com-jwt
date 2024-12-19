const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/db');

const app = express();

// Conectar ao MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(productRoutes);

app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});
