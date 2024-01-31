import { DataSource, DataSourceOptions } from 'typeorm';
import { Product } from './products/product.entity';

export const dbDataSource: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'graysa',
  entities: [Product],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
};

const dataSource = new DataSource(dbDataSource);

export default dataSource;