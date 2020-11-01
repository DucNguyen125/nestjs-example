import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { ProductEntity } from "./product.entity";
import { CreateProductDto, UpdateProductDto } from "./dto";
import { Product, FilterProduct } from "./product.interface";
import { validate } from "class-validator";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { HttpStatus } from "@nestjs/common";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async create(dto: CreateProductDto): Promise<Product> {
    const { product_code, product_name, price } = dto;
    const newProduct = new ProductEntity();
    newProduct.product_code = product_code;
    newProduct.product_name = product_name;
    newProduct.price = price;

    const errors = await validate(newProduct);
    if (errors.length > 0) {
      const error = "input is not valid.";
      throw new HttpException(
        { message: "Input data validation failed", error },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedProduct = await this.productRepository.save(newProduct);
      return { product: savedProduct };
    }
  }

  public async update(product_id: number, dto: UpdateProductDto): Promise<ProductEntity> {
    let updateProduct = await this.productRepository.findOne(product_id);
    updateProduct = Object.assign(updateProduct, dto);
    return await this.productRepository.save(updateProduct);
  }

  public async delete(product_id: number): Promise<DeleteResult> {
    return await this.productRepository.delete({ id: product_id });
  }

  public async findById(product_id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne(product_id);
    if (!product) {
      const errors = "Product not found";
      throw new HttpException({ errors }, 500);
    }
    return product;
  }

  public async filter(query: FilterProduct): Promise<ProductEntity[]> {
    const take: number = query.limit || 20;
    const skip: number = (query.page - 1) * take || 0;
    delete query.limit;
    delete query.page;
    return await this.productRepository.find({
      where: query,
      take,
      skip,
    });
  }
}
