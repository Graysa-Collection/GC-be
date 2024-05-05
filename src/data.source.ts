import { DataSource, DataSourceOptions } from 'typeorm';
import { Product } from './products/product.entity';
import { Category } from './categories/category.entity';
import { ProductImage } from './products/product-images.entity';
import { ParentCategory } from './parent_categories/parent_categories.entity';
import { User } from './users/user.entity';
import { CartItem } from './add-to-cart/cart-item.entity';
import * as dotenv from 'dotenv';
import { Order } from './order/order.entity';
import { OrderedItem } from './ordered-items/ordered-items.entity';
import { NewArrival } from './new-arrivals/new-arrival.entity';
import { ContactUs } from './contact-us/contact-us.entity';

dotenv.config();

export const dbDataSource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    Product,
    Category,
    ProductImage,
    ParentCategory,
    User,
    CartItem,
    Order,
    OrderedItem,
    NewArrival,
    ContactUs,
  ],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
};

const dataSource = new DataSource(dbDataSource);

export default dataSource;
