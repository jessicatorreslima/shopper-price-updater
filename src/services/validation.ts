import Product from '../models/Product';

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
    validationResult.rulesBroken.push('The product code and/or the new price are missing or invalid');
  }
}

function validateNumericValues(product: Product, validationResult: ProductValidationResult): void {
  const { newPrice } = product;

  if (Number.isNaN(newPrice)) {
    validationResult.isValid = false;
    validationResult.rulesBroken.push(`Invalid value for the new price: ${newPrice}`);
  }
}

function validatePriceUpdate(product: Product, validationResult: ProductValidationResult): void {
  const { code, newPrice, costPrice } = product;

  if (newPrice < costPrice) {
    validationResult.isValid = false;
    validationResult.rulesBroken.push('The sales price is lower than the cost price for the product');
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
    validationResult.rulesBroken.push(`The new price differs from the previous price by more than ${MAX_PRICE_CHANGE_PERCENTAGE}%`);
  }
}
