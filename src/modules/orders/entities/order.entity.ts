/* eslint-disable */

import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Address } from '../../address/entities/address.entities';
import { OrderItem } from '../../order-items/entities/order-item.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { OrderFee } from '../../order-fees/entities/order-fee.entity';

@Table({ tableName: 'orders', timestamps: true })
export class Order extends Model<Order> {
  @Column(DataType.DECIMAL(12,2)) total_amount: number;
  @Column(DataType.STRING) status: string; defaultValue: 'pending'; 
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id: number;

  @ForeignKey(() => Address)
  @Column(DataType.INTEGER)
  address_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Address)
  address: Address;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];
 
  @HasMany(() => Payment)
  payments: Payment[];

  @HasMany(() => OrderFee)
  fees: OrderFee[];
}
