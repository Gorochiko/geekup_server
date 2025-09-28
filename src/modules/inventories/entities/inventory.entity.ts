/* eslint-disable */

import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ProductVariant } from '../../products-variants/entities/products-variant.entity';
import { Store } from '../../stores/entities/store.entity';

@Table({ tableName: 'inventories', timestamps: false })
export class Inventory extends Model<Inventory> {
  @ForeignKey(() => ProductVariant)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  products_variants_id: number;

  @ForeignKey(() => Store)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  stores_id: number;

  @Column(DataType.INTEGER)
  quantity: number;

  @BelongsTo(() => ProductVariant)
  variant: ProductVariant;

  @BelongsTo(() => Store)
  store: Store;
}
