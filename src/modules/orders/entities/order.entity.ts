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
import { User } from '../../users/entities/user.entity';
import { Address } from '../../address/entities/address.entities';
import { OrderItem } from '../../order-items/entities/order-item.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { OrderFee } from '../../order-fees/entities/order-fee.entity';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'orders', timestamps: true })
export class Order extends Model<Order> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare id: string;

  @Column(DataType.DECIMAL(12, 2)) total_amount: number;

  @Column({
    type: DataType.STRING,
    defaultValue: 'pending',
  })
  status: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id: string;

  @ForeignKey(() => Address)
  @Column(DataType.UUID)
  address_id: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Address)
  address: Address;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @HasMany(() => Payment)
  payments: Payment[];

  @HasMany(() => OrderFee)
  fees: OrderFee[];
}
