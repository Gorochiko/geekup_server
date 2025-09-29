import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaymentsService } from '../payments/payments.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Sequelize } from 'sequelize-typescript';
import { OrderRepo } from './order.interface';
import { ORDER_CODE } from './order.interface';
import { ProductsVariantsService } from '../products-variants/products-variants.service';
import { CreateOrderItemDto } from '../order-items/dto/create-order-item.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_CODE)
    private readonly repo: OrderRepo,
    private readonly paymentService: PaymentsService,
    private readonly eventEmitter: EventEmitter2,
    private readonly sequelize: Sequelize,
    private readonly productVariant: ProductsVariantsService,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    return await this.sequelize.transaction(async (t) => {
      const itemsWithPrice: CreateOrderItemDto[] = [];
      for (const i of dto.items) {
        // Lấy variant từ service
        const variant = await this.productVariant.findByid(
          i.products_variants_id,
        );
        if (!variant)
          throw new Error(
            `Product variant ${i.products_variants_id} not found`,
          );

        const price = Number(variant.dataValues.price);
        if (isNaN(price))
          throw new Error(`Invalid price for variant ${variant.id}`);

        itemsWithPrice.push({
          products_variants_id: variant.id,
          unit_price: price,
          quantity: i.quantity,
        });

        console.log('Variant price:', price, 'for', variant.id);
      }

      const totalItems = itemsWithPrice.reduce(
        (sum, item) => sum + item.unit_price * item.quantity,
        0,
      );
      const totalFees = dto.fees.reduce((sum, fee) => sum + fee.amount, 0);
      console.log(totalItems, 'hehrer');
      const totalAmount = totalItems + totalFees;

      // 2. Tạo order
      const order = await this.repo.createOrder(
        {
          user_id: dto.user_id,
          address_id: dto.address_id,
          status: 'pending',
          total_amount: totalAmount,
        },
        t,
      );

      await this.repo.bulkCreateItems(
        dto.items.map((i) => ({
          order_id: order.id,
          products_variants_id: i.products_variants_id,
          unit_price: i.unit_price,
          quantity: i.quantity,
        })),
        t,
      );

      await this.repo.bulkCreateFees(
        dto.fees.map((f) => ({
          order_id: order.id,
          name: f.name,
          amount: f.amount,
          type: f.type,
        })),
        t,
      );

      console.log('Sending to MoMo:', {
        orderId: order.id,
        amount: totalAmount,
        orderInfo: 'Thanh toán đơn hàng ' + order.id,
      });

      if (isNaN(totalAmount)) throw new Error('totalAmount is NaN!');
      const momoResponse = await this.paymentService.createMoMoPayment(
        order.id,
        totalAmount,
        'Thanh toán đơn hàng ' + order.id,
      );

      await this.repo.createPayment(
        {
          order_id: order.id,
          amount: totalAmount,
          status: momoResponse.resultCode === 0 ? 'pending' : 'failed',
          method: 'momo',
          transaction_id: momoResponse.transId || null,
        },
        t,
      );

      this.eventEmitter.emit('order.created', { orderId: order.id });

      return { order, momoResponse };
    });
  }
  async findAll() {
    return await this.repo.findAllOrders();
  }

  async findOne(id: string) {
    return await this.repo.findById(id);
  }
}
