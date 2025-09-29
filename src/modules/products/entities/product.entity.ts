import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { Category } from '../../categories/entities/category.entity';
import { ProductVariant } from '../../products-variants/entities/products-variant.entity';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'products', timestamps: true })
export class Product extends Model<Product> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare id: string;

  @Column(DataType.STRING) name: string;
  @Column(DataType.TEXT) description: string;

  @ForeignKey(() => Category)
  @Column(DataType.UUID)
  category_id: string;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => ProductVariant)
  variants: ProductVariant[];
}
