import Product from "../models/Product";

export interface ProductValidationResult {
  product: Product;
  isValid: boolean;
  rulesBroken: string[];
}

export function validateProduct(product: Product): ProductValidationResult {
  const validationResult: ProductValidationResult = {
    product,
    isValid: true,
    rulesBroken: [],
  };

  validateRequiredFields(product, validationResult);
  validateNumericValues(product, validationResult);
  validatePriceUpdate(product, validationResult);
  validatePriceChange(product, validationResult);

  return validationResult;
}

function validateRequiredFields(product: Product, validationResult: ProductValidationResult): void {
  const { code, newPrice } = product;

  if (!code || !newPrice || typeof code !== "number" || typeof newPrice !== "number") {
    validationResult.isValid = false;
    validationResult.rulesBroken.push("Product code and new price are required and must be numbers");
  }
}

function validateNumericValues(product: Product, validationResult: ProductValidationResult): void {
  const { newPrice } = product;

  if (Number.isNaN(newPrice)) {
    validationResult.isValid = false;
    validationResult.rulesBroken.push(`Invalid value for product cost price: ${newPrice}`);
  }
}

function validatePriceUpdate(product: Product, validationResult: ProductValidationResult): void {
  const { code, newPrice, costPrice } = product;

  if (newPrice < costPrice) {
    validationResult.isValid = false;
    validationResult.rulesBroken.push(`The sales price cannot be lower than the cost for product with code ${code}`);
  }
}

function validatePriceChange(product: Product, validationResult: ProductValidationResult): void {
  const MAX_PRICE_CHANGE_PERCENTAGE = 10;

  const { code, newPrice, salesPrice } = product;

  const currentPrice = salesPrice;

  const maxAllowedPrice = currentPrice + (currentPrice * MAX_PRICE_CHANGE_PERCENTAGE) / 100;
  const minAllowedPrice = currentPrice - (currentPrice * MAX_PRICE_CHANGE_PERCENTAGE) / 100;

  if (newPrice > maxAllowedPrice || newPrice < minAllowedPrice) {
    validationResult.isValid = false;
    validationResult.rulesBroken.push(`The new price should not differ from the previous price by more than ${MAX_PRICE_CHANGE_PERCENTAGE}%`);
  }
}
