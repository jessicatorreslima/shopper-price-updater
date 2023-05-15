import express from 'express';
import multer from 'multer';
import { loadProductsFromCSV } from '../services/csvLoader';
import { validateProducts } from '../services/productService';

const router = express.Router();

// Configurar o multer para lidar com o upload de arquivos
const upload = multer({ dest: 'uploads/' });

// Rota para validar os produtos do arquivo
router.post('/validate', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file || !file.path) {
      res.status(400).send('Nenhum arquivo foi enviado');
      return;
    }

    const newPrices = await loadProductsFromCSV(file.path);
    
    // Chamar a função para validar os produtos do arquivo
    const validatedProducts = await validateProducts(newPrices);

    // Restante da lógica para atualização dos preços
    // ...

    res.status(200).json(validatedProducts);
  } catch (error) {
    console.error('Erro ao validar os produtos:', error);
    res.status(500).send('Erro ao validar os produtos');
  }
});

export default router;
