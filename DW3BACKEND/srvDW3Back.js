require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const router = require('./ROUTES/routes');

const port = process.env.PORT || 4000;

// --- Middlewares (Configurações) ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// --- Rotas ---
app.use('/', router);

app.listen(port, () => {
  console.log(`Servidor Back-end rodando na porta ${port}`);
});