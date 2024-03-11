import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderedItem } from './ordered-items.entity';
import { Repository } from 'typeorm';
import { Order } from '@/order/order.entity';
import { CartItem } from '@/add-to-cart/cart-item.entity';

@Injectable()
export class OrderedItemsService {
  constructor(
    @InjectRepository(OrderedItem)
    private readonly orderedItemRepository: Repository<OrderedItem>,
  ) {}

  getAll() {
    return this.orderedItemRepository.find({
      relations: {
        product: true,
      },
    });
  }

  create(order: Order, cartItem: CartItem): Promise<OrderedItem> {
    const orderedItem = new OrderedItem();
    orderedItem.order = order;
    orderedItem.product = cartItem.product;
    orderedItem.quantity = cartItem.quantity;
    return this.orderedItemRepository.save(orderedItem);
  }
}
