import { Controller, Get, Post, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { UserExtract } from '@/users/user.decorator';
import { User } from '@/users/user.entity';
import { Auth } from '@/auth/auth.decorator';
import { Public } from '@/auth/public.decorator';
import { Role } from '@/roles/roles.enum';
import { handleErrorResponse } from '@/utils/handleErrorResponse';
import { Response } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/all')
  @Auth([Role.ADMIN])
  getAll() {
    return this.orderService.getAll();
  }

  @Get()
  @Auth([Role.CUSTOMER])
  getAllForUser(@UserExtract() user: User) {
    return this.orderService.getAllForUser(user.id);
  }

  @Post()
  @Auth([Role.CUSTOMER])
  async placeOrder(@UserExtract() user: User, @Res() res: Response) {
    try {
      await this.orderService.placeOrder(user.id);
      return res.json({ message: 'Ordered placed successfully' });
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }
}
