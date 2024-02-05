import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CategoriesModule } from '@/categories/categories.module';
import { ProductImage } from './product-images.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ProductImageService } from './product-images.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage]),
    MulterModule.register({ dest: './uploads' }),
    CategoriesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductImageService],
})
export class ProductsModule {}
