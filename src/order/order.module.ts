import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddToCartService } from '@/add-to-cart/add-to-cart.service';
import { OrderedItemsModule } from '@/ordered-items/ordered-items.module';
import { AddToCartModule } from '@/add-to-cart/add-to-cart.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    OrderedItemsModule,
    AddToCartModule,
    UsersModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
