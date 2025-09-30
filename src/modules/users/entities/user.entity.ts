import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
  Default,
  AllowNull,
} from 'sequelize-typescript';
import { defaultValueSchemable } from 'sequelize/types/utils';
import { Address } from 'src/modules/address/entities/address.entities';
import { Order } from 'src/modules/orders/entities/order.entity';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
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
  name: string;

     @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passowrd: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type:DataType.STRING,
      allowNull: false,
      defaultValue:"user"
  })
  
  role:string 

  @HasMany(() => Address)
  addresses: Address[];

  @HasMany(() => Order)
  orders: Order[];
}
