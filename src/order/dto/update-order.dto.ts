export class UpdateOrderDto {
  readonly order_code: string;
  readonly order_type: string;
  readonly products: string[];
  readonly order_status: string;
  readonly quantity: number;
  readonly total_price: number;
}
