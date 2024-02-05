import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './product-images.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  save(productImage: ProductImage): Promise<ProductImage> {
    return this.productImageRepository.save(productImage);
  }

  delete(productImage: ProductImage) {
    const rootDir = join(__dirname, '..', '..');
    const filePath = `${rootDir}/${productImage.imageUrl}`;
    fs.unlink(filePath, () => {});
    return this.productImageRepository.delete({ id: productImage.id });
  }
}
