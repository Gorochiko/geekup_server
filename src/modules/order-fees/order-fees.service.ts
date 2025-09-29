import { Injectable } from '@nestjs/common';
import { CreateOrderFeeDto } from './dto/create-order-fee.dto';
import { OrderFee } from './entities/order-fee.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class OrderFeesService {
  constructor(
    @InjectModel(OrderFee)
    private readonly orderFeeModel: typeof OrderFee,
  ) {}

 async create(createOrderFeeDto: CreateOrderFeeDto) {
    return await this.orderFeeModel.create(
      createOrderFeeDto as CreationAttributes<OrderFee>,
    );
  }

  async findAll() {
    return await this.orderFeeModel.findAll();
  }

  async findOne(id: string) {
    return await this.orderFeeModel.findByPk(id);
  }

  async remove(id: string) {
    const fee = await this.findOne(id);
    if (fee) {
      await fee.destroy();
    }
    return { deleted: true };
  }
}
