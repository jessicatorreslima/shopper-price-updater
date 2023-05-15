import { getDatabaseConnection, closeDatabaseConnection } from '../../database';
import Product from '../models/Product';
import { validateProduct, ProductValidationResult } from "./validation";
import { loadProductsFromCSV } from "./csvLoader";
import ProductRepository from '../repositories/productRepository';

export async function fetchProductsInfos(products: Product[]): Promise<Product[]> {
  try {
    const productCodes = products.map((product) => product.code);
    const productRepository = new ProductRepository();
    const productsDbInfos = await productRepository.fetchProductsInfos(productCodes);

    for (const product of products) {
      const dbInfo = productsDbInfos.find((dbProduct) => dbProduct.code === product.code);

      if (dbInfo) {
        product.name = dbInfo.name;
        product.costPrice = parseFloat(dbInfo.cost_price);
        product.salesPrice = parseFloat(dbInfo.sales_price);
      }
    }

    return products;
  } catch (error) {
    console.error('Failed to fetch product information:', error);
    throw error;
  }
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

export async function updatePrices(products: Product[]): Promise<void> {
  try {
    const productRepository = new ProductRepository();

    for (const product of products) {
      await productRepository.updatePriceInDatabase(product);
      console.log(`Price updated successfully for product with code ${product.code}`);
    }

    console.log("Prices updated successfully!");
  } catch (error) {
    console.error("Failed to update prices:", error);
    throw error;
  }
}