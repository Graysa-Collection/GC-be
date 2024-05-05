import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ParentCategoriesModule } from './parent_categories/parent_categories.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { dbDataSource } from './data.source';
import { AddToCartModule } from './add-to-cart/add-to-cart.module';
import { OrderModule } from './order/order.module';
import { OrderedItemsModule } from './ordered-items/ordered-items.module';
import { NewArrivalsModule } from './new-arrivals/new-arrivals.module';
import { ContactUsModule } from './contact-us/contact-us.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dbDataSource),
    ProductsModule,
    CategoriesModule,
    ParentCategoriesModule,
    AuthModule,
    UsersModule,
    AddToCartModule,
    OrderModule,
    OrderedItemsModule,
    NewArrivalsModule,
    ContactUsModule,
  ],
})
export class AppModule {}
