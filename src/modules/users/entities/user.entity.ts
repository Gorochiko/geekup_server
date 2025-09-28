import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Address } from 'src/modules/address/entities/address.entities';
import { Order } from 'src/modules/orders/entities/order.entity';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @HasMany(() => Address)
  addresses: Address[];

  @HasMany(() => Order)
  orders: Order[];
}
