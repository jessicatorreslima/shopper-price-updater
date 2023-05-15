import Product from "../models/Product";

export function csvInfosValidations(products: Product[]): void {
  for (const product of products) {
    validateRequiredFields(product);
    validateNumericValues(product);
  }
}

export function pricesValidations(products: Product[]): void {
  for (const product of products) {
    validatePriceUpdate(product);
    validatePriceChange(product);
  }
}

function validateRequiredFields(product: Product): void {
  const { code, newPrice } = product;

  if (!code || !newPrice || typeof code !== "number" || typeof newPrice !== "number") {
    throw new Error("Product code and new price are required and must be numbers");
  }
}

function validateNumericValues(product: Product): void {
  const { newPrice } = product;

  if (Number.isNaN(newPrice)) {
    throw new Error(`Invalid value for product cost price: ${newPrice}`);
  }
}

function validatePriceUpdate(product: Product): void {
  const { code, newPrice, salesPrice } = product;

  if (newPrice < salesPrice) {
    throw new Error(`The sales price cannot be lower than the cost for product with code ${code}`);
  }
}

function validatePriceChange(product: Product): void {
  const MAX_PRICE_CHANGE_PERCENTAGE = 10;

  const { code, newPrice, salesPrice } = product;

  const currentPrice = salesPrice;

  const maxAllowedPrice = currentPrice + (currentPrice * MAX_PRICE_CHANGE_PERCENTAGE) / 100;
  const minAllowedPrice = currentPrice - (currentPrice * MAX_PRICE_CHANGE_PERCENTAGE) / 100;

  if (newPrice > maxAllowedPrice || newPrice < minAllowedPrice) {
    throw new Error(`Invalid price change for product with code ${code}`);
  }
}
