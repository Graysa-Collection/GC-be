import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ProductDto } from './product.dto';
import { validate } from '@/utils/validator';
import { CategoriesService } from '@/categories/categories.service';
import { Category } from '@/categories/category.entity';
import { ProductImage } from './product-images.entity';
import { ProductImageService } from './product-images.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly productImagesService: ProductImageService,
    private readonly categoryService: CategoriesService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: {
        categories: true,
        images: true,
      },
    });
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: {
        categories: true,
        images: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async create(productDto: ProductDto): Promise<Product> {
    this.validateProductDto(productDto);

    const categories = await this.getProductCategories(productDto.categories);

    const product = new Product();
    product.title = productDto.title;
    product.description = productDto.description;
    product.stockAmount = productDto.stockAmount;
    product.price = productDto.price;
    product.categories = categories;

    return this.productRepository.save(product);
  }

  async update(product: Product, productDto: ProductDto): Promise<Product> {
    this.validateProductDto(productDto);

    const categories = await this.getProductCategories(productDto.categories);

    product.title = productDto.title;
    product.description = productDto.description;
    product.stockAmount = productDto.stockAmount;
    product.price = productDto.price;
    product.categories = categories;

    return this.productRepository.save(product);
  }

  delete(product: Product): Promise<DeleteResult> {
    return this.productRepository.delete({ id: product.id });
  }

  async getProductCategories(categoryIds: number[]): Promise<Category[]> {
    const categories: Category[] = [];
    for (let i = 0; i < categoryIds.length; i++) {
      const category = await this.categoryService.findById(categoryIds[i]);
      categories.push(category);
    }
    return categories;
  }

  async saveImages(
    images: Express.Multer.File[],
    product: Product,
  ): Promise<Product> {
    const productImages: ProductImage[] = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const productImage = new ProductImage();
      productImage.imageUrl = image.path;
      productImages.push(productImage);
      await this.productImagesService.save(productImage);
    }

    if (product.images) {
      product.images = product.images.concat(productImages);
    } else {
      product.images = productImages;
    }

    return this.productRepository.save(product);
  }

  deleteImageWithId(imageId: string, product: Product): Promise<DeleteResult> {
    const filterImages = product.images.filter(
      (image) => image.id === Number(imageId),
    );
    if (filterImages.length < 1) {
      throw new BadRequestException('Image does not exist');
    }
    const imageToBeDeleted = filterImages[0];
    return this.productImagesService.delete(imageToBeDeleted);
  }

  private validateProductDto(productDto: ProductDto): void {
    try {
      validate(productDto.title).isString().isNotEmpty();
    } catch (error: any) {
      throw new BadRequestException(`Title is ${error.message}`);
    }
    try {
      validate(productDto.description).isNotEmpty();
    } catch (error: any) {
      throw new BadRequestException(`Description is ${error.message}`);
    }
    try {
      validate(Number(productDto.stockAmount))
        .isNumber()
        .isNotNegative()
        .isNotEmpty();
    } catch (error: any) {
      throw new BadRequestException(`Stock amount is ${error.message}`);
    }
    try {
      validate(Number(productDto.price))
        .isNumber()
        .isNotNegative()
        .isNotEmpty();
    } catch (error: any) {
      throw new BadRequestException(`Price is ${error.message}`);
    }
  }
}
