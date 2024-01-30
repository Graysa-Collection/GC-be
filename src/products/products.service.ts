import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  getProducts() {
    return ['product 1', 'product 2', 'product 3'];
  }
}
