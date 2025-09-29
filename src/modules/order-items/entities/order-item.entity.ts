import { v4 as uuidv4 } from 'uuid';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { Order } from '../../orders/entities/order.entity';
import { ProductVariant } from '../../products-variants/entities/products-variant.entity';

@Table({ tableName: 'order_items', timestamps: false })
export class OrderItem extends Model<OrderItem> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare id: string;


  @Column(DataType.DECIMAL(12, 2)) unit_price: number;
  @Column(DataType.INTEGER) quantity: number;

  @ForeignKey(() => Order)
  @Column(DataType.UUID)
  order_id: string;

  @ForeignKey(() => ProductVariant)
  @Column(DataType.UUID)
  products_variants_id: string;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => ProductVariant)
  variant: ProductVariant;
}
