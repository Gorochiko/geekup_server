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
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from './modules/auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrderFeesModule } from './modules/order-fees/order-fees.module';
import { OrderItemsModule } from './modules/order-items/order-items.module';
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
    EventEmitterModule.forRoot(),
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    ProductsVariantsModule,
    AddressModule,
    OrdersModule,
    OrderFeesModule,
    OrderItemsModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          // ignoreTLS: true,
          // secure: false,
          auth: {
            user: configService.get<string>('MAILDEV_USER'),
            pass: configService.get<string>('MAILDEV_PASS'),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        // preview: true,
        template: {
          dir: process.cwd() + '/src/mail/templates/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
})
export class AppModule {}
