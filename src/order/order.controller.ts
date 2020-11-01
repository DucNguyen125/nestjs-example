import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { CreateOrderDto, UpdateOrderDto } from "./dto";
import { OrderEntity } from "./order.entity";
import { FilterOrder, Order } from "./order.interface";
import { OrderService } from "./order.service";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() body: CreateOrderDto): Promise<Order> {
    return this.orderService.create(body);
  }

  @Put("/:order_id")
  updateOrder(
    @Param("order_id") order_id: number,
    @Body() body: UpdateOrderDto,
  ): Promise<OrderEntity> {
    return this.orderService.update(order_id, body);
  }

  @Delete("/:order_id")
  deleteOrder(@Param("order_id") order_id: number): Promise<DeleteResult> {
    return this.orderService.delete(order_id);
  }

  @Get("/:order_id")
  getOrder(@Param("order_id") order_id: number): Promise<OrderEntity> {
    return this.orderService.findById(order_id);
  }

  @Get()
  getListOrder(@Query() query: FilterOrder): Promise<OrderEntity[]> {
    return this.orderService.filter(query);
  }
}
