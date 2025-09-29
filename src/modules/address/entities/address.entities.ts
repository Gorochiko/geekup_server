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
import { User } from 'src/modules/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
@Table({ tableName: 'address', timestamps: true })
export class Address extends Model<Address> {
  @PrimaryKey
  @Default(uuidv4) 
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
   declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  province: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  district: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  commune: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address_line: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  housing_type: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @BelongsTo(() => User)
  user: User;
}
