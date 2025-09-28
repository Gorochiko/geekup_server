import { Injectable } from '@nestjs/common';
import { CreateOrderFeeDto } from './dto/create-order-fee.dto';
import { UpdateOrderFeeDto } from './dto/update-order-fee.dto';

@Injectable()
export class OrderFeesService {
  create(createOrderFeeDto: CreateOrderFeeDto) {
    return 'This action adds a new orderFee';
  }

  findAll() {
    return `This action returns all orderFees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderFee`;
  }

  update(id: number, updateOrderFeeDto: UpdateOrderFeeDto) {
    return `This action updates a #${id} orderFee`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderFee`;
  }
}
