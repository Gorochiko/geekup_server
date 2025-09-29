import { Table, Column, Model, DataType, HasMany, PrimaryKey, Default } from 'sequelize-typescript';
import { Product } from '../../products/entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'categories', timestamps: false })
export class Category extends Model<Category> {
  @PrimaryKey
  @Default(uuidv4) 
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
   declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @HasMany(() => Product)
  products: Product[];
}
