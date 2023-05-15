import mysql2 from 'mysql2';
import Product from '../models/Product';
import { getDatabaseConnection } from '../../database';

class ProductRepository {
  private connection: mysql2.Connection;

  constructor() {
    this.connection = getDatabaseConnection();
  }
  public async fetchProductsInfos(productCodes: number[]): Promise<any[]> {
    const sql = 'SELECT code, name, cost_price, sales_price FROM products WHERE code IN (?)';
    const values = [productCodes];

    try {
      const results = await new Promise<any[]>((resolve, reject) => {
        this.connection.query(sql, values, (error, results: any[]) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      return results;
    } catch (error) {
      console.error('Failed to fetch product information:', error);
      throw error;
    }
  }

  public async updatePriceInDatabase(product: Product): Promise<void> {
    try {
      const query = 'UPDATE products SET sales_price = ? WHERE code = ?';
      const values = [product.newPrice, product.code];

      await new Promise<void>((resolve, reject) => {
        this.connection.execute(query, values, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });

      console.log(`Price updated successfully for product with code ${product.code}`);
    } catch (error) {
      console.error(`Failed to update price for product with code ${product.code}:`, error);
      throw error;
    }
  }
}

export default ProductRepository;