import { DataSource, DataSourceOptions } from 'typeorm';
import { Product } from './products/product.entity';
import { Category } from './categories/category.entity';
import { ProductImage } from './products/product-images.entity';
import { ParentCategory } from './parent_categories/parent_categories.entity';
import { User } from './users/user.entity';

export const dbDataSource: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'graysa',
  entities: [Product, Category, ProductImage, ParentCategory, User],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
};

const dataSource = new DataSource(dbDataSource);

export default dataSource;
