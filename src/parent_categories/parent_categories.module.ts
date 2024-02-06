import { Module } from '@nestjs/common';
import { ParentCategoriesService } from './parent_categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentCategory } from './parent_categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParentCategory])],
  providers: [ParentCategoriesService],
  exports: [ParentCategoriesService],
})
export class ParentCategoriesModule {}
