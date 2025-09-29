import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './repositories/order.repository';
import { PaymentsModule } from '../payments/payments.module';
import { ORDER_CODE } from './order.interface';

import { OrderFeesModule } from '../order-fees/order-fees.module';
import { OrderItemsModule } from '../order-items/order-items.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { OrderFee } from '../order-fees/entities/order-fee.entity';
import { Payment } from '../payments/entities/payment.entity';
import { ProductsVariantsModule } from '../products-variants/products-variants.module';
@Module({
  imports: [
    forwardRef(() => PaymentsModule),
    OrderFeesModule,
    OrderItemsModule,
    ProductsVariantsModule,
    SequelizeModule.forFeature([Order, OrderItem, OrderFee, Payment]),
  ], // dùng forwardRef
  controllers: [OrdersController],
  providers: [
    OrderService,
    {
      provide: ORDER_CODE,
      useClass: OrderRepository,
    },
  ],
  exports: [OrderService, ORDER_CODE],
})
export class OrdersModule {}
