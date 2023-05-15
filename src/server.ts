import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import { updatePrices } from './services/updatePrices';

const app = express();

app.get('/test-update-prices', async (req, res: express.Response) => {
  try {
    await updatePrices();
    res.send('Update prices completed successfully');
  } catch (error) {
    console.error('Error updating prices:', error);
    res.status(500).send('Error updating prices');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
