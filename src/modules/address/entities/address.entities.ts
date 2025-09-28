import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.entity';

@Table({ tableName: 'address', timestamps: true })
export class Address extends Model<Address> {
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
