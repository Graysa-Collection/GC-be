import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ProductDto } from './product.dto';
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

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  create(productDto: ProductDto): Promise<Product> {
    this.validateProductDto(productDto);

    const product = new Product();
    product.title = productDto.title;
    product.description = productDto.description;
    product.stockAmount = productDto.stockAmount;
    product.price = productDto.price;

    return this.productRepository.save(product);
  }

  update(product: Product, productDto: ProductDto): Promise<Product> {
    this.validateProductDto(productDto);

    product.title = productDto.title;
    product.description = productDto.description;
    product.stockAmount = productDto.stockAmount;
    product.price = productDto.price;

    return this.productRepository.save(product);
  }

  delete(product: Product): Promise<DeleteResult> {
    return this.productRepository.delete(product);
  }

  validateProductDto(productDto: ProductDto): void {
    try {
      validate(productDto.title).isString().isNotEmpty();
    } catch (error: any) {
      throw new BadRequestException(`Title is ${error.message}`);
    }
    try {
      validate(productDto.description).isNotEmpty();
    } catch (error: any) {
      throw new BadRequestException(`Description is ${error.message}`);
    }
    try {
      validate(productDto.stockAmount).isNumber().isNotNegative().isNotEmpty();
    } catch (error: any) {
      throw new BadRequestException(`Stock amount is ${error.message}`);
    }
    try {
      validate(productDto.price).isNumber().isNotNegative().isNotEmpty();
    } catch (error: any) {
      throw new BadRequestException(`Price is ${error.message}`);
    }
  }
}
