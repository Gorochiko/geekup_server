import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../../order-items/entities/order-item.entity';
import { OrderFee } from '../../order-fees/entities/order-fee.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { OrderRepo } from '../order.interface';
import { CreateOrderFeeDto } from 'src/modules/order-fees/dto/create-order-fee.dto';




@Injectable()
export class OrderRepository implements OrderRepo{
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(OrderItem) private orderItemModel: typeof OrderItem,
    @InjectModel(OrderFee) private orderFeeModel: typeof OrderFee,
    @InjectModel(Payment) private paymentModel: typeof Payment,
  ) {}

  async createOrder(data: Partial<Order>, transaction?: any) {
    return this.orderModel.create(data as Order, { transaction });
  }

  async bulkCreateItems(items: Partial<OrderItem>[], transaction?: any) {
    return this.orderItemModel.bulkCreate(items as OrderItem[] , { transaction });
  }

  async bulkCreateFees(fees: Partial<CreateOrderFeeDto>[], transaction?: any) {
    return this.orderFeeModel.bulkCreate(fees as OrderFee[], { transaction });
  }

  async createPayment(data: Partial<Payment>, transaction?: any) {
    return this.paymentModel.create(data as Payment, { transaction });
  }

  async updatePaymentStatus(orderId: string, status: string) {
    return this.paymentModel.update({ status }, { where: { order_id: orderId } });
  }

  async findById(id: string) {
    return this.orderModel.findByPk(id, { include: [OrderItem, OrderFee, Payment] });
  }

  async findAllOrders(){
    const res = await this.orderModel.findAll()
    return res;
  }

  async updateStatus(orderId: string, status: string) {
  return await this.orderModel.update(
    { status },
    { where: { id: orderId } },
  );
}
}
