import { Body, Controller, Delete, Get, Post, Put, Res } from '@nestjs/common';
import { AddToCartService } from './add-to-cart.service';
import { UserExtract } from '@/users/user.decorator';
import { User } from '@/users/user.entity';
import { AddToCartDto } from './cart.dto';
import { ProductsService } from '@/products/products.service';
import { handleErrorResponse } from '@/utils/handleErrorResponse';
import { Response } from 'express';
import { ItemQuantityDto } from './item-quantity.dto';
import { DeleteItemDto } from './delete-item.dto';

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

  @Put('/update-quantity')
  async setProductAmount(
    @UserExtract() user: User,
    @Body() itemQuantityDto: ItemQuantityDto,
    @Res() res: Response,
  ) {
    try {
      const cartItem = await this.aAddToCartService.findCartProduct(
        user.id,
        itemQuantityDto.productId,
      );
      const updatedCartItem =
        await this.aAddToCartService.updateProductQuantity(
          cartItem,
          itemQuantityDto,
        );
      return res.json(updatedCartItem);
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Delete('/items')
  async deleteCartItem(
    @UserExtract() user: User,
    @Body() deleteItemDto: DeleteItemDto,
    @Res() res: Response,
  ) {
    try {
      await this.aAddToCartService.deleteCartItem(
        user.id,
        deleteItemDto.productId,
      );
      return res.json({ message: 'Cart item deleted successfully' });
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }
}
