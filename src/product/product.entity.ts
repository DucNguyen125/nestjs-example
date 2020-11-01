import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("products")
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_code: string;

  @Column()
  product_name: string;

  @Column()
  price: number;
}
