import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NewArrivalsService } from './new-arrivals.service';
import { Public } from '@/auth/public.decorator';
import { Auth } from '@/auth/auth.decorator';
import { Role } from '@/roles/roles.enum';
import { handleErrorResponse } from '@/utils/handleErrorResponse';
import { Response } from 'express';
import { ProductsService } from '@/products/products.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('new-arrivals')
export class NewArrivalsController {
  constructor(
    private readonly newArrivalService: NewArrivalsService,
    private readonly productsService: ProductsService,
  ) {}

  @Get()
  @Public()
  getAll() {
    return this.newArrivalService.getAll();
  }

  @Post('/:productId')
  @Auth([Role.ADMIN])
  @UseInterceptors(FileInterceptor('image'))
  async addProductAsNewArrival(
    @Param('productId') productId: number,
    @UploadedFile() image: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.findById(productId);
      const newArrival = await this.newArrivalService.create(product, image);
      return res.json(newArrival);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Delete('/:id')
  @Auth([Role.ADMIN])
  async removeFromNewArrival(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.newArrivalService.remove(id);
      return res.json({ message: 'New arrival deleted successfully' });
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }
}
