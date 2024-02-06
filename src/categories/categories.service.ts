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
import { ParentCategoriesService } from '@/parent_categories/parent_categories.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly parentCategoryService: ParentCategoriesService,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async findByIdWithProducts(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: {
        products: true,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async create(categoryDto: CategoryDto): Promise<Category> {
    this.validateCategoryDto(categoryDto);

    const parentCategory = await this.parentCategoryService.findById(
      categoryDto.parentCategoryId,
    );

    const category = new Category();
    category.name = categoryDto.name;
    category.parentCategory = parentCategory;

    return this.categoryRepository.save(category);
  }

  async update(
    category: Category,
    categoryDto: CategoryDto,
  ): Promise<Category> {
    this.validateCategoryDto(categoryDto);

    const parentCategory = await this.parentCategoryService.findById(
      categoryDto.parentCategoryId,
    );

    category.name = categoryDto.name;
    category.parentCategory = parentCategory;

    return this.categoryRepository.save(category);
  }

  delete(category: Category): Promise<DeleteResult> {
    return this.categoryRepository.delete({ id: category.id });
  }

  validateCategoryDto(categoryDto: CategoryDto): void {
    try {
      validate(categoryDto.name).isString().isNotEmpty();
    } catch (error: any) {
      throw new BadRequestException(`Category name is ${error.message}`);
    }
  }
}
