import { Module } from '@nestjs/common';
import { AddToCartController } from './add-to-cart.controller';
import { AddToCartService } from './add-to-cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@/users/users.module';
import { ProductsModule } from '@/products/products.module';
import { CartItem } from './cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), UsersModule, ProductsModule],
  controllers: [AddToCartController],
  providers: [AddToCartService],
})
export class AddToCartModule {}
