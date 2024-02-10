import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './category.dto';
import { handleErrorResponse } from '@/utils/handleErrorResponse';
import { Response } from 'express';
import { Public } from '@/auth/public.decorator';
import { Auth } from '@/auth/auth.decorator';
import { Role } from '@/roles/roles.enum';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  @Public()
  getAllCategories() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @Public()
  async getCategory(@Param('id') id: number, @Res() res: Response) {
    try {
      const category = await this.categoryService.findById(id);
      return res.json(category);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Get(':id/products')
  @Public()
  async getCategoryWithProducts(@Param('id') id: number, @Res() res: Response) {
    try {
      const category = await this.categoryService.findByIdWithProducts(id);
      return res.json(category);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Post()
  @Auth([Role.ADMIN])
  async createCategory(@Body() categoryDto: CategoryDto, @Res() res: Response) {
    try {
      const category = await this.categoryService.create(categoryDto);
      return res.json(category);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Put(':id')
  @Auth([Role.ADMIN])
  async updateCategory(
    @Param('id') id: number,
    @Body() categoryDto: CategoryDto,
    @Res() res: Response,
  ) {
    try {
      const category = await this.categoryService.findById(id);
      const updatedCategory = await this.categoryService.update(
        category,
        categoryDto,
      );
      return res.json(updatedCategory);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Delete(':id')
  @Auth([Role.ADMIN])
  async deleteProduct(@Param('id') id: number, @Res() res: Response) {
    try {
      const category = await this.categoryService.findById(id);
      await this.categoryService.delete(category);
      return res.json({ message: 'Category deleted successfully' });
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }
}
