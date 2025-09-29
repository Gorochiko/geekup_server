
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { Inventory } from '../../inventories/entities/inventory.entity';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'stores', timestamps: false })
export class Store extends Model<Store> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare id: string;

  @Column(DataType.STRING) name: string;
  @Column(DataType.STRING) address: string;

  @HasMany(() => Inventory)
  inventories: Inventory[];
}
