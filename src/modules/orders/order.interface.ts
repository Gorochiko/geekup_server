// order-repo.interface.ts
import { Order } from './entities/order.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { OrderFee } from '../order-fees/entities/order-fee.entity';
import { Payment } from '../payments/entities/payment.entity';

export const ORDER_CODE = 'ORDER_REPO';

export interface OrderRepo {
  createOrder(data: Partial<Order>, transaction?: any);
  bulkCreateItems(items: Partial<OrderItem>[], transaction?: any);
  bulkCreateFees(fees: Partial<OrderFee>[], transaction?: any);
  createPayment(data: Partial<Payment>, transaction?: any);
  updatePaymentStatus(orderId: string, status: string);
  findById(id: string);
  findAllOrders();
  updateStatus(orderId: string, status: string);
}