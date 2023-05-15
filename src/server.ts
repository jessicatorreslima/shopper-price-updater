import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import routes from './routes/routes';


const app = express();

// Middleware para analisar o corpo das solicitações como JSON
app.use(express.json());

// Definir o roteamento das rotas
app.use('/api', routes);

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
