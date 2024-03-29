import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProductsService } from '@/products/products.service';
import { validate } from '@/utils/validator';
import { CartItem } from './cart-item.entity';
import { ItemQuantityDto } from './item-quantity.dto';

@Injectable()
export class AddToCartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly productsService: ProductsService,
  ) {}

  findAll(userId: number): Promise<CartItem[]> {
    return this.cartItemRepository.find({
      where: { userId },
      relations: {
        product: true,
      },
    });
  }

  async add(userId: number, productId: number): Promise<CartItem> {
    const product = await this.productsService.findById(productId);
    const existingCartItem = await this.cartItemRepository.findOneBy({
      userId,
      product,
    });

    if (existingCartItem) {
      return existingCartItem;
    }

    const cartItem = new CartItem();
    cartItem.userId = userId;
    cartItem.product = product;
    cartItem.quantity = 1;
    return this.cartItemRepository.save(cartItem);
  }

  async findCartProduct(userId: number, productId: number): Promise<CartItem> {
    const product = await this.productsService.findById(productId);
    const cartItem = await this.cartItemRepository.findOne({
      where: {
        userId,
        product,
      },
      relations: {
        product: true,
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    return cartItem;
  }

  updateProductQuantity(
    cartItem: CartItem,
    itemQuantityDto: ItemQuantityDto,
  ): Promise<CartItem> {
    this.validateQuantityDto(itemQuantityDto);
    this.checkIfQuantityInStock(
      itemQuantityDto.quantity,
      cartItem.product.stockAmount,
    );

    cartItem.quantity = itemQuantityDto.quantity;
    return this.cartItemRepository.save(cartItem);
  }

  async deleteCartItem(
    userId: number,
    productId: number,
  ): Promise<DeleteResult> {
    const cartItem = await this.findCartProduct(userId, productId);
    return this.cartItemRepository.delete(cartItem);
  }

  private checkIfQuantityInStock(
    requestedQuantity: number,
    stockAmount: number,
  ) {
    const isValidQuantity = requestedQuantity < stockAmount;

    if (!isValidQuantity) {
      throw new BadRequestException('Invalid Quantity');
    }
  }

  private validateQuantityDto(itemQuantityDto: ItemQuantityDto): void {
    try {
      validate(itemQuantityDto.quantity).isNotEmpty().isNumber();
    } catch (error: any) {
      throw new BadRequestException(`Quantity is ${error.message}`);
    }
  }
}
