/* eslint-disable */

import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Inventory } from '../../inventories/entities/inventory.entity';

@Table({ tableName: 'stores', timestamps: false })
export class Store extends Model<Store> {
  @Column(DataType.STRING) name: string;
  @Column(DataType.STRING) address: string;

  @HasMany(() => Inventory)
  inventories: Inventory[];
}
