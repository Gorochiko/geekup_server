/* eslint-disable */

import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Product } from '../../products/entities/product.entity';
import { Inventory } from '../../inventories/entities/inventory.entity';
import { OrderItem } from '../../order-items/entities/order-item.entity';

@Table({ tableName: 'products_variants', timestamps: true })
export class ProductVariant extends Model<ProductVariant> {
  @Column(DataType.STRING) size: string;
  @Column(DataType.STRING) color: string;
  @Column(DataType.DECIMAL(12,2)) price: number;
  @Column(DataType.STRING) image_url: string;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  products_id: number;

  @BelongsTo(() => Product)
  product: Product;

  @HasMany(() => Inventory)
  inventories: Inventory[];

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];
}
