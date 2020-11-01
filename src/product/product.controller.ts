import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { CreateProductDto, UpdateProductDto } from "./dto";
import { ProductEntity } from "./product.entity";
import { FilterProduct, Product } from "./product.interface";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() body: CreateProductDto): Promise<Product> {
    return this.productService.create(body);
  }

  @Put("/:product_id")
  updateProduct(
    @Param("product_id") product_id: number,
    @Body() body: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.update(product_id, body);
  }

  @Delete("/:product_id")
  deleteProduct(@Param("product_id") product_id: number): Promise<DeleteResult> {
    return this.productService.delete(product_id);
  }

  @Get("/:product_id")
  getProduct(@Param("product_id") product_id: number): Promise<ProductEntity> {
    return this.productService.findById(product_id);
  }

  @Get()
  getListProduct(@Query() query: FilterProduct): Promise<ProductEntity[]> {
    return this.productService.filter(query);
  }
}
