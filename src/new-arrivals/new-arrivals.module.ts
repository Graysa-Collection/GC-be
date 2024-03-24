import { Module } from '@nestjs/common';
import { NewArrivalsService } from './new-arrivals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewArrival } from './new-arrival.entity';
import { ProductsModule } from '@/products/products.module';
import { NewArrivalsController } from './new-arrivals.controller';
import { UsersModule } from '@/users/users.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewArrival]),
    MulterModule.register({ dest: './uploads' }),
    ProductsModule,
    UsersModule,
  ],
  providers: [NewArrivalsService],
  controllers: [NewArrivalsController],
})
export class NewArrivalsModule {}
