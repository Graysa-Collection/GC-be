import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddToCartService } from '@/add-to-cart/add-to-cart.service';
import { OrderedItemsService } from '@/ordered-items/ordered-items.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly cartService: AddToCartService,
    private readonly orderedItemService: OrderedItemsService,
  ) {}

  getAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: {
        orderedItems: {
          product: true,
        },
      },
    });
  }

  getAllForUser(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { userId: userId },
      relations: {
        orderedItems: true,
      },
    });
  }

  async getById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        orderedItems: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async placeOrder(userId: number) {
    const cartItems = await this.cartService.findAll(userId);

    const order = new Order();
    order.createdAt = new Date();
    order.userId = userId;

    const createdOrder = await this.orderRepository.save(order);

    for (const cartItem of cartItems) {
      await this.orderedItemService.create(createdOrder, cartItem);
      await this.cartService.deleteCartItem(userId, cartItem.product.id);
    }
  }
}
