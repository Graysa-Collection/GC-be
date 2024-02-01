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
import { ProductsService } from './products.service';
import { Response } from 'express';
import { ProductDto } from './product.dto';
import { handleErrorResponse } from '@/utils/handleErrorResponse';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number, @Res() res: Response) {
    try {
      const product = await this.productsService.findById(id);
      return res.json(product);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Post()
  async createProduct(@Body() productDto: ProductDto, @Res() res: Response) {
    try {
      const product = await this.productsService.create(productDto);
      return res.json(product);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() productDto: ProductDto,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.findById(id);
      const createdProduct = await this.productsService.update(
        product,
        productDto,
      );
      return res.json(createdProduct);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number, @Res() res: Response) {
    try {
      const product = await this.productsService.findById(id);
      await this.productsService.delete(product);
      return res.json({ message: 'Product deleted successfully' });
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }
}
