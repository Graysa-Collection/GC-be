import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response } from 'express';
import { ProductDto } from './product.dto';
import { handleErrorResponse } from '@/utils/handleErrorResponse';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Role } from '@/roles/roles.enum';
import { Public } from '@/auth/public.decorator';
import { Auth } from '@/auth/auth.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Public()
  getProducts() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Public()
  async getProductById(@Param('id') id: number, @Res() res: Response) {
    try {
      const product = await this.productsService.findById(id);
      return res.json(product);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Post()
  @Auth([Role.ADMIN])
  @UseInterceptors(FilesInterceptor('images'))
  async createProduct(
    @Body() productDto: ProductDto,
    @UploadedFiles() images: Express.Multer.File[],
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.create(productDto);
      const productWithImages = await this.productsService.saveImages(
        images,
        product,
      );
      return res.json(productWithImages);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Put(':id')
  @Auth([Role.ADMIN])
  @UseInterceptors(FilesInterceptor('images'))
  async updateProduct(
    @Param('id') id: number,
    @Body() productDto: ProductDto,
    @UploadedFiles() images: Express.Multer.File[],
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.findById(id);
      const updatedProduct = await this.productsService.update(
        product,
        productDto,
      );
      const productWithImages = await this.productsService.saveImages(
        images,
        updatedProduct,
      );
      return res.json(productWithImages);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Delete(':id')
  @Auth([Role.ADMIN])
  async deleteProduct(@Param('id') id: number, @Res() res: Response) {
    try {
      const product = await this.productsService.findById(id);
      await this.productsService.delete(product);
      return res.json({ message: 'Product deleted successfully' });
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Delete(':id/image/:imageId')
  @Auth([Role.ADMIN])
  async deleteProductImage(
    @Param('id') id: number,
    @Param('imageId') imageId: string,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.findById(id);
      await this.productsService.deleteImageWithId(imageId, product);
      return res.json({ message: 'Product image deleted successfully' });
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }
}
