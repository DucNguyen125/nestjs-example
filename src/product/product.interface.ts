export interface ProductData {
  id: number;
  product_code: string;
  product_name: string;
  price: number;
}

export interface Product {
  product: ProductData;
}

export interface FilterProduct {
  limit: number;
  page: number;
  product_code?: string;
  product_name?: string;
}
