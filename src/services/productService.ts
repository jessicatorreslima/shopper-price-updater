import { getDatabaseConnection, closeDatabaseConnection } from '../../database';
import Product from '../models/Product';

export function fetchProductsInfos(products: Product[]): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT code, name, cost_price, sales_price FROM products WHERE code IN (?)';
    const values = [products.map((product) => product.code)]; // Obter somente os códigos dos produtos
    const connection = getDatabaseConnection();

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        const rows = Array.isArray(results) ? results : []; // Converter para um array, caso não seja

        for (const row of rows) {
          if (typeof row === 'object' && 'code' in row) {
            const { code, name, cost_price: costPrice, sales_price: salesPrice } = row;

            // Encontrar o produto correspondente pelo código
            const product = products.find((p) => p.code === code);

            // Atualizar as informações do produto
            if (product) {
              product.name = name;
              product.costPrice = parseFloat(costPrice);
              product.salesPrice = parseFloat(salesPrice);
            }
          }
        }

        resolve(products);
      }
    });
  });
}

// Outras funções relacionadas aos produtos...
