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
  validateProductExistence(product, validationResult);
  validatePriceUpdate(product, validationResult);
  validatePriceChange(product, validationResult);

  return validationResult;
}

function validateRequiredFields(product: Product, validationResult: ProductValidationResult): void {
  const { code, newPrice } = product;

  if (!code || !newPrice || typeof code !== "number" || typeof newPrice !== "number") {
    validationResult.isValid = false;
    validationResult.rulesBroken.push('O código do produto e/ou o novo preço estão faltando ou inválidos');
  }
}

function validateNumericValues(product: Product, validationResult: ProductValidationResult): void {
  const { newPrice } = product;

  if (Number.isNaN(newPrice)) {
    validationResult.isValid = false;
    validationResult.rulesBroken.push(`Valor inválido para o novo preço: ${newPrice}`);
  }
}

function validateProductExistence(product: Product, validationResult: ProductValidationResult): void {
  const { salesPrice } = product;

  if (Number.isNaN(salesPrice)) {
    validationResult.isValid = false;
    validationResult.rulesBroken.push('O código do produto informado não existe no banco de dados');
  }
}

function validatePriceUpdate(product: Product, validationResult: ProductValidationResult): void {
  const { newPrice, costPrice } = product;

  if (newPrice < costPrice) {
    validationResult.isValid = false;
    validationResult.rulesBroken.push('O preço de venda é menor que o preço de custo');
  }
}

function validatePriceChange(product: Product, validationResult: ProductValidationResult): void {
  const MAX_PRICE_CHANGE_PERCENTAGE = 10;

  const { newPrice, salesPrice } = product;

  const currentPrice = salesPrice;

  const maxAllowedPrice = currentPrice + (currentPrice * MAX_PRICE_CHANGE_PERCENTAGE) / 100;
  const minAllowedPrice = currentPrice - (currentPrice * MAX_PRICE_CHANGE_PERCENTAGE) / 100;

  if (newPrice > maxAllowedPrice || newPrice < minAllowedPrice) {
    validationResult.isValid = false;
    validationResult.rulesBroken.push(`O novo preço difere do preço anterior em mais de ${MAX_PRICE_CHANGE_PERCENTAGE}%`);
  }
}
