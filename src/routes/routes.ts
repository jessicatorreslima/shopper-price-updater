import express from 'express';
import multer from 'multer';
import { loadProductsFromCSV } from '../services/csvLoader';
import { updatePrices } from '../services/updatePrices';

const router = express.Router();

// Configurar o multer para lidar com o upload de arquivos
const upload = multer({ dest: 'uploads/' });

// Rota para receber a solicitação de upload do arquivo CSV
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file || !file.path) {
      res.status(400).send('Nenhum arquivo foi enviado');
      return;
    }

    // Aqui você pode fazer o processamento do arquivo se o caminho do arquivo não for vazio
    await loadProductsFromCSV(file.path);

    await updatePrices(file.path);

    res.status(200).send('Arquivo CSV enviado e processado com sucesso');
  } catch (error) {
    console.error('Erro ao processar o arquivo CSV:', error);
    res.status(500).send('Erro ao processar o arquivo CSV');
  }
});

export default router;
