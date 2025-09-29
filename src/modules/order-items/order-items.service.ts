import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrderItem } from './entities/order-item.entity';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class OrderItemsService {
   constructor(
    @InjectModel(OrderItem)
    private readonly orderItemModel: typeof OrderItem,
  ) {}
    async create(createOrderItemDto: CreateOrderItemDto) {
    return await this.orderItemModel.create(
      createOrderItemDto as unknown as CreationAttributes<OrderItem>,
    );
  }

  async bulkCreate(items: CreateOrderItemDto[]) {
    return await this.orderItemModel.bulkCreate(
      items as unknown as CreationAttributes<OrderItem>[],
    );
  }

  async findAll() {
    return await this.orderItemModel.findAll();
  }

  async findOne(id: string) {
    return await this.orderItemModel.findByPk(id);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    if (item) {
      await item.destroy();
    }
    return { deleted: true };
  }
}
