import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { NewArrival } from './new-arrival.entity';
import { Product } from '@/products/product.entity';
import { deleteFileFromSystem } from '@/utils/deleteFileFromSystem';

@Injectable()
export class NewArrivalsService {
  constructor(
    @InjectRepository(NewArrival)
    private readonly newArrivalRepository: Repository<NewArrival>,
  ) {}

  getAll(): Promise<NewArrival[]> {
    return this.newArrivalRepository.find({
      relations: {
        product: true,
      },
    });
  }

  async getOneById(id: number): Promise<NewArrival> {
    const newArrival = await this.newArrivalRepository.findOneBy({ id });

    if (!newArrival) {
      throw new NotFoundException('New arrival not found');
    }

    return newArrival;
  }

  create(product: Product, image: Express.Multer.File): Promise<NewArrival> {
    const newArrival = new NewArrival();
    newArrival.imageUrl = image.path;
    newArrival.product = product;
    return this.newArrivalRepository.save(newArrival);
  }

  async remove(newArrivalId: number): Promise<DeleteResult> {
    const newArrival = await this.getOneById(newArrivalId);

    deleteFileFromSystem(newArrival.imageUrl);

    return this.newArrivalRepository.delete({ id: newArrival.id });
  }
}
