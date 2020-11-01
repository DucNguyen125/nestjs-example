import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { OrderEntity } from "./order.entity";
import { CreateOrderDto, UpdateOrderDto } from "./dto";
import { Order, FilterOrder } from "./order.interface";
import { validate } from "class-validator";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { HttpStatus } from "@nestjs/common";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  public async create(dto: CreateOrderDto): Promise<Order> {
    const { order_code, order_type, products, quantity, total_price, order_status } = dto;
    const newOrder = new OrderEntity();
    newOrder.order_code = order_code;
    newOrder.order_type = order_type;
    newOrder.order_status = order_status;
    newOrder.products = products;
    newOrder.quantity = quantity;
    newOrder.total_price = total_price;

    const errors = await validate(newOrder);
    if (errors.length > 0) {
      const error = "input is not valid.";
      throw new HttpException(
        { message: "Input data validation failed", error },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedOrder = await this.orderRepository.save(newOrder);
      return { order: savedOrder };
    }
  }

  public async update(order_id: number, dto: UpdateOrderDto): Promise<OrderEntity> {
    let updateOrder = await this.orderRepository.findOne(order_id);
    updateOrder = Object.assign(updateOrder, dto);
    return await this.orderRepository.save(updateOrder);
  }

  public async delete(order_id: number): Promise<DeleteResult> {
    return await this.orderRepository.delete({ id: order_id });
  }

  public async findById(order_id: number): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne(order_id);
    if (!order) {
      const errors = "Order not found";
      throw new HttpException({ errors }, 500);
    }
    return order;
  }

  public async filter(query: FilterOrder): Promise<OrderEntity[]> {
    const take: number = query.limit || 20;
    const skip: number = (query.page - 1) * take || 0;
    delete query.limit;
    delete query.page;
    return await this.orderRepository.find({
      where: query,
      take,
      skip,
    });
  }
}
