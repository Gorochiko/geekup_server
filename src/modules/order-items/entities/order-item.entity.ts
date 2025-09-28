/* eslint-disable */

import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from '../../orders/entities/order.entity';
import { ProductVariant } from '../../products-variants/entities/products-variant.entity';

@Table({ tableName: 'order_items', timestamps: false })
export class OrderItem extends Model<OrderItem> {
  @Column(DataType.DECIMAL(12,2)) unit_price: number;
  @Column(DataType.INTEGER) quantity: number;

  @ForeignKey(() => Order)
  @Column(DataType.INTEGER)
  order_id: number;

  @ForeignKey(() => ProductVariant)
  @Column(DataType.INTEGER)
  products_variants_id: number;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => ProductVariant)
  variant: ProductVariant;
}
