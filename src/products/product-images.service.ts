import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './product-images.entity';
import { Repository } from 'typeorm';
import { deleteFileFromSystem } from '@/utils/deleteFileFromSystem';

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
    deleteFileFromSystem(productImage.imageUrl);
    return this.productImageRepository.delete({ id: productImage.id });
  }
}
