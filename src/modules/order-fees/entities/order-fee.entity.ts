/* eslint-disable */

import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, Default } from 'sequelize-typescript';
import { Order } from '../../orders/entities/order.entity';
import { v4 as uuidv4 } from 'uuid';
@Table({ tableName: 'order_fees', timestamps: false })
export class OrderFee extends Model<OrderFee> {
  @PrimaryKey
  @Default(uuidv4) 
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
   declare id: string;

  @Column(DataType.STRING) name: string;
  @Column(DataType.DECIMAL(12,2)) amount: number;
  @Column(DataType.STRING) type: string;

  @ForeignKey(() => Order)
  @Column(DataType.UUID)
  order_id: string;

  @BelongsTo(() => Order)
  order: Order;
}
