import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './modules/users/entities/user.entity';
import { Address } from './modules/address/entities/address.entities';
import { Category } from './modules/categories/entities/category.entity';
import { Inventory } from './modules/inventories/entities/inventory.entity';
import { Order } from './modules/orders/entities/order.entity';
import { OrderFee } from './modules/order-fees/entities/order-fee.entity';
import { OrderItem } from './modules/order-items/entities/order-item.entity';
import { Payment } from './modules/payments/entities/payment.entity';
import { Product } from './modules/products/entities/product.entity';
import { ProductVariant } from './modules/products-variants/entities/products-variant.entity';
import { Store } from './modules/stores/entities/store.entity';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsVariantsModule } from './modules/products-variants/products-variants.module';
import { AddressModule } from './modules/address/address.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
        logging: console.log,
      }),
    }),
    SequelizeModule.forFeature([
      User,
      Address,
      Category,
      Inventory,
      Order,
      OrderFee,
      OrderItem,
      Payment,
      Product,
      ProductVariant,
      Store,
    ]),
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    ProductsVariantsModule,
    AddressModule,
    OrdersModule,
  ],
})
export class AppModule {}
