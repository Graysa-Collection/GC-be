import { Module } from '@nestjs/common';
import { OrderedItemsService } from './ordered-items.service';
import { OrderedItem } from './ordered-items.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderedItem])],
  providers: [OrderedItemsService],
  exports: [OrderedItemsService],
})
export class OrderedItemsModule {}
