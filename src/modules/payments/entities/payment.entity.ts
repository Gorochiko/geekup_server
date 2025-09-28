/* eslint-disable */

import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from '../../orders/entities/order.entity';

@Table({ tableName: 'payments', timestamps: true })
export class Payment extends Model<Payment> {
  @Column(DataType.STRING) method: string;
  @Column(DataType.DECIMAL(12,2)) amount: number;
  @Column(DataType.STRING) status: string;
  @Column(DataType.STRING) transaction_id: string;

  @ForeignKey(() => Order)
  @Column(DataType.INTEGER)
  order_id: number;

  @BelongsTo(() => Order)
  order: Order;
}
