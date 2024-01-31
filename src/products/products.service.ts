import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './create-product.dto';
import { validate } from '@/utils/validator';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findById(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  create(createProductDto: CreateProductDto) {
    this.validateCreateDto(createProductDto);
    const product = new Product();
    product.title = createProductDto.title;
    product.description = createProductDto.description;
    product.stockAmount = createProductDto.stockAmount;
    product.price = createProductDto.price;
    return this.productRepository.save(product);
  }

  validateCreateDto(createProductDto: CreateProductDto) {
    try {
      validate(createProductDto.title).isString().isNotEmpty();
    } catch (error: any) {
      throw new BadRequestException(`Title is ${error.message}`);
    }
    try {
      validate(createProductDto.description).isNotEmpty();
    } catch (error: any) {
      throw new BadRequestException(`Description is ${error.message}`);
    }
    try {
      validate(createProductDto.stockAmount)
        .isNumber()
        .isNotNegative()
        .isNotEmpty();
    } catch (error: any) {
      throw new BadRequestException(`Stock amount is ${error.message}`);
    }
    try {
      validate(createProductDto.price).isNumber().isNotNegative().isNotEmpty();
    } catch (error: any) {
      throw new BadRequestException(`Price is ${error.message}`);
    }
  }
}
