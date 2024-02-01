import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryDto } from './category.dto';
import { validate } from '@/utils/validator';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOneById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  create(categoryDto: CategoryDto): Promise<Category> {
    this.validateCategoryDto(categoryDto);

    const category = new Category();
    category.name = categoryDto.name;
    return this.categoryRepository.save(category);
  }

  update(category: Category, categoryDto: CategoryDto): Promise<Category> {
    this.validateCategoryDto(categoryDto);
    category.name = categoryDto.name;
    return this.categoryRepository.save(category);
  }

  delete(category: Category): Promise<DeleteResult> {
    return this.categoryRepository.delete(category);
  }

  validateCategoryDto(categoryDto: CategoryDto): void {
    try {
      validate(categoryDto.name).isString().isNotEmpty();
    } catch (error: any) {
      throw new BadRequestException(`Category name is ${error.message}`);
    }
  }
}
