import { getDatabaseConnection, closeDatabaseConnection } from '../../database';
import { fetchProductsInfos } from '../services/productService';
import { csvInfosValidations, pricesValidations } from '../services/validation';
import { loadProductsFromCSV } from '../services/csvLoader';

const CSV_FILE_PATH = 'data.csv';

export async function updatePrices(): Promise<void> {
  try {
    const products = await loadProductsFromCSV(CSV_FILE_PATH);
    
    csvInfosValidations(products);

    const updatedProducts = await fetchProductsInfos(products);
    
    await pricesValidations(updatedProducts);

    const connection = getDatabaseConnection();

    for (const product of updatedProducts) {
      const { code, newPrice } = product;
      
      const sql = `UPDATE products SET sales_price = ? WHERE code = ?`;
      const values = [newPrice, code];

      connection.query(sql, values, (error, results) => {
        if (error) {
          console.error(`Failed to update price for product with code ${code}:`, error);
        } else {
          console.log(`Price updated successfully for product with code ${code}`);
        }
      });
    }

    closeDatabaseConnection();
    console.log('Prices updated successfully!');
  } catch (error) {
    console.error('Failed to update prices:', error);
  }
}
