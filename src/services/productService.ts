import { getDatabaseConnection, closeDatabaseConnection } from '../../database';
import Product from '../models/Product';
import { validateProduct, ProductValidationResult } from "./validation";
import { loadProductsFromCSV } from "./csvLoader";

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

export async function validateProducts(products: Product[]): Promise<ProductValidationResult[]> {
  const validationResults: ProductValidationResult[] = [];
  const productsDbInfos: Product[] = await fetchProductsInfos(products);
  
  for (const product of productsDbInfos) {
    const validationResult = validateProduct(product);
    validationResults.push(validationResult);
  }

  return validationResults;
}

export async function updatePrices(csvFilePath: string): Promise<void> {
  try {
    const products = await loadProductsFromCSV(csvFilePath);
    
    const productsDbInfos = await fetchProductsInfos(products);

    for (const product of productsDbInfos) {
      const { code, newPrice } = product;

      // TODO: atualização dos preços no banco de dados aqui
      // Exemplo fictício: updatePriceInDatabase(code, newPrice);

      console.log(`Price updated successfully for product with code ${code}`);
    }

    console.log("Prices updated successfully!");
  } catch (error) {
    console.error("Failed to update prices:", error);
  }
}
