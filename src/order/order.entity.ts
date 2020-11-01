import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("orders")
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_code: string;

  @Column({ type: "enum", enum: ["furniture", "kitchen"] })
  order_type: string;

  @Column("json")
  products: string[];

  @Column({ type: "enum", enum: ["pending", "success", "fail"] })
  order_status: string;

  @Column()
  quantity: number;

  @Column()
  total_price: number;
}
