class Product {
  public code: number;
  public name: string;
  public costPrice: number;
  public salesPrice: number;
  public newPrice: number;

  constructor(code: number, newPrice: number) {
    this.code = code;
    this.name = "";
    this.costPrice = NaN;
    this.salesPrice = NaN;
    this.newPrice = newPrice;
  }
}

export default Product;