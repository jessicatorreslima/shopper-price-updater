import fs from 'fs';
import { parse } from 'csv-parse';

import Product from '../models/Product';

export async function loadProductsFromCSV(filePath: string): Promise<Product[]> {
  const products: Product[] = [];
  let isFirstLine = true;

  const parser = fs
    .createReadStream(filePath)
    .pipe(parse({ delimiter: ',' }));

  for await (const record of parser) {
    if (isFirstLine) {
      isFirstLine = false;
      continue;
    }

    const [code, newPrice] = record;
    const product = new Product(Number(code), Number(newPrice));
    products.push(product);
  }

  return products;
}
