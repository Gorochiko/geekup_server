/* eslint-disable */

import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, Default } from 'sequelize-typescript';
import { Order } from '../../orders/entities/order.entity';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'payments', timestamps: true })
export class Payment extends Model<Payment> {
  @PrimaryKey
  @Default(uuidv4) 
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
   declare id: string;

  @Column(DataType.STRING) method: string;
  @Column(DataType.DECIMAL(12,2)) amount: number;
  @Column(DataType.STRING) status: string;
  @Column(DataType.STRING) transaction_id: string;

  @ForeignKey(() => Order)
  @Column(DataType.UUID)
  order_id: string;

  @BelongsTo(() => Order)
  order: Order;
}
