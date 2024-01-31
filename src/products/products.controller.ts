import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response } from 'express';
import { CreateProductDto } from './create-product.dto';
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
    const product = await this.productsService.findById(id);

    if (!product) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    }

    return res.json(product);
  }

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.create(createProductDto);
      return res.json(product);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }
}
