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

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async getCategory(@Param('id') id: number, @Res() res: Response) {
    try {
      const category = await this.categoryService.findOneById(id);
      return res.json(category);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Post()
  async createCategory(@Body() categoryDto: CategoryDto, @Res() res: Response) {
    try {
      const category = await this.categoryService.create(categoryDto);
      return res.json(category);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() categoryDto: CategoryDto,
    @Res() res: Response,
  ) {
    try {
      const category = await this.categoryService.findOneById(id);
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
  async deleteProduct(@Param('id') id: number, @Res() res: Response) {
    try {
      const category = await this.categoryService.findOneById(id);
      await this.categoryService.delete(category);
      return res.json({ message: 'Category deleted successfully' });
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }
}
