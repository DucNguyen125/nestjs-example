import { IsNotEmpty } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  readonly order_code: string;

  @IsNotEmpty()
  readonly order_type: string;

  @IsNotEmpty()
  readonly products: string[];

  @IsNotEmpty()
  readonly order_status: string;

  @IsNotEmpty()
  readonly quantity: number;

  @IsNotEmpty()
  readonly total_price: number;
}
