/* eslint-disable */

import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from '../../orders/entities/order.entity';

@Table({ tableName: 'order_fees', timestamps: false })
export class OrderFee extends Model<OrderFee> {
  @Column(DataType.STRING) name: string;
  @Column(DataType.DECIMAL(12,2)) amount: number;
  @Column(DataType.STRING) type: string;

  @ForeignKey(() => Order)
  @Column(DataType.INTEGER)
  order_id: number;

  @BelongsTo(() => Order)
  order: Order;
}
