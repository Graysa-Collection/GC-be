import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParentCategory } from './parent_categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParentCategoriesService {
  constructor(
    @InjectRepository(ParentCategory)
    private readonly parentCategoryRepository: Repository<ParentCategory>,
  ) {}

  async findById(id: number): Promise<ParentCategory> {
    const parentCategory = await this.parentCategoryRepository.findOne({
      where: { id },
    });

    if (!parentCategory) {
      throw new NotFoundException('Parent category not found');
    }

    return parentCategory;
  }
}
