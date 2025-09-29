/* eslint-disable */

import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ProductVariant } from '../../products-variants/entities/products-variant.entity';
import { Store } from '../../stores/entities/store.entity';

@Table({ tableName: 'inventories', timestamps: false })
export class Inventory extends Model<Inventory> {
  @ForeignKey(() => ProductVariant)
  @Column({ type: DataType.UUID, primaryKey: true })
  products_variants_id: string;

  @ForeignKey(() => Store)
  @Column({ type: DataType.UUID, primaryKey: true })
  stores_id: string;

  @Column(DataType.INTEGER)
  quantity: number;

  @BelongsTo(() => ProductVariant)
  variant: ProductVariant;

  @BelongsTo(() => Store)
  store: Store;
}
