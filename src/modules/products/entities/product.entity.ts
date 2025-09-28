/* eslint-disable */

import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Category } from '../../categories/entities/category.entity';
import { ProductVariant } from '../../products-variants/entities/products-variant.entity';

@Table({ tableName: 'products', timestamps: true })
export class Product extends Model<Product> {
  @Column(DataType.STRING) name: string;
  @Column(DataType.TEXT) description: string;

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => ProductVariant)
  variants: ProductVariant[];
}
