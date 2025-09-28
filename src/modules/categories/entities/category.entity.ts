import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Product } from '../../products/entities/product.entity';

@Table({ tableName: 'categories', timestamps: false })
export class Category extends Model<Category> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Product)
  products: Product[];
}
