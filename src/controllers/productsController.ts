import { Request, Response } from 'express';
import Product from '../models/Product';

// Sample products data
const products: Product[] = [
  new Product(1, 'Product A', 10.99, 19.99),
  new Product(2, 'Product B', 8.99, 15.99),
  new Product(3, 'Product C', 5.99, 12.99),
];

// Controller for handling product-related operations
class ProductsController {
  // Get all products
  public getAllProducts(req: Request, res: Response): void {
    res.json(products);
  }

  // Get a product by code
  public getProductByCode(req: Request, res: Response): void {
    const code = parseInt(req.params.code);
    const product = products.find((p) => p.code === code);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  }

  // Create a new product
  public createProduct(req: Request, res: Response): void {
    const { code, name, costPrice, salesPrice } = req.body;
    const newProduct = new Product(code, name, costPrice, salesPrice);
    products.push(newProduct);

    res.status(201).json(newProduct);
  }

  // Update a product
  public updateProduct(req: Request, res: Response): void {
    const code = parseInt(req.params.code);
    const { name, costPrice, salesPrice } = req.body;
    const product = products.find((p) => p.code === code);

    if (product) {
      product.name = name || product.name;
      product.costPrice = costPrice || product.costPrice;
      product.salesPrice = salesPrice || product.salesPrice;

      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  }

  // Delete a product
  public deleteProduct(req: Request, res: Response): void {
    const code = parseInt(req.params.code);
    const index = products.findIndex((p) => p.code === code);

    if (index !== -1) {
      const deletedProduct = products.splice(index, 1);
      res.json(deletedProduct[0]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  }
}

export default new ProductsController();
