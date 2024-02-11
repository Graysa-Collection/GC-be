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
import { AddToCartService } from './add-to-cart.service';
import { UserExtract } from '@/users/user.decorator';
import { User } from '@/users/user.entity';
import { AddToCartDto } from './cart.dto';
import { ProductsService } from '@/products/products.service';
import { handleErrorResponse } from '@/utils/handleErrorResponse';
import { Response } from 'express';
import { CartQuantityDto } from './cart-quantity.dto';

@Controller('add-to-cart')
export class AddToCartController {
  constructor(
    private readonly aAddToCartService: AddToCartService,
    private readonly productsService: ProductsService,
  ) {}

  @Get('/items')
  getUserCartItems(@UserExtract() user: User) {
    return this.aAddToCartService.findAll(user.id);
  }

  @Post()
  async addProductToCart(
    @UserExtract() user: User,
    @Body() addToCartDto: AddToCartDto,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.findById(
        addToCartDto.productId,
      );
      const createdCartItem = await this.aAddToCartService.add(
        user.id,
        product.id,
      );
      return res.json(createdCartItem);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Put('/update-quantity/:productId')
  async setProductAmount(
    @UserExtract() user: User,
    @Param('productId') productId: number,
    @Body() cartQuantityDto: CartQuantityDto,
    @Res() res: Response,
  ) {
    try {
      const cartItem = await this.aAddToCartService.findCartProduct(
        user.id,
        productId,
      );
      const updatedCartItem =
        await this.aAddToCartService.updateProductQuantity(
          cartItem,
          cartQuantityDto,
        );
      return res.json(updatedCartItem);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Delete('/items/:productId')
  async deleteCartItem(
    @UserExtract() user: User,
    @Param('productId') productId: number,
    @Res() res: Response,
  ) {
    try {
      await this.aAddToCartService.deleteCartItem(user.id, productId);
      return res.json({ message: 'Cart item deleted successfully' });
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }
}
