/* eslint-disable */

import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, PrimaryKey, Default } from 'sequelize-typescript';
import { Product } from '../../products/entities/product.entity';
import { Inventory } from '../../inventories/entities/inventory.entity';
import { OrderItem } from '../../order-items/entities/order-item.entity';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'products_variants', timestamps: true })
export class ProductVariant extends Model<ProductVariant> {
    @PrimaryKey
  @Default(uuidv4) 
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
   declare id: string;

  @Column(DataType.STRING) size: string;
  @Column(DataType.STRING) color: string;
  @Column(DataType.DECIMAL(12,2)) price: number;
  @Column(DataType.STRING) image_url: string;

  @ForeignKey(() => Product)
  @Column(DataType.UUID)
  products_id: string;

  @BelongsTo(() => Product)
  product: Product;

  @HasMany(() => Inventory)
  inventories: Inventory[];

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];
}
