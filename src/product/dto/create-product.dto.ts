import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  readonly product_code: string;

  @IsNotEmpty()
  readonly product_name: string;

  @IsNotEmpty()
  readonly price: number;
}
