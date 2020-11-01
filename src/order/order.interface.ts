export interface OrderData {
  id: number;
  order_code: string;
  order_type: string;
  products: string[];
  order_status: string;
  quantity: number;
  total_price: number;
}

export interface Order {
  order: OrderData;
}

export interface FilterOrder {
  limit: number;
  page: number;
  order_id?: number;
  order_code?: string;
  order_type?: string;
  order_status?: string;
}
