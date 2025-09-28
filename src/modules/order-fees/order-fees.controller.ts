import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderFeesService } from './order-fees.service';
import { CreateOrderFeeDto } from './dto/create-order-fee.dto';
import { UpdateOrderFeeDto } from './dto/update-order-fee.dto';

@Controller('order-fees')
export class OrderFeesController {
  constructor(private readonly orderFeesService: OrderFeesService) {}

  @Post()
  create(@Body() createOrderFeeDto: CreateOrderFeeDto) {
    return this.orderFeesService.create(createOrderFeeDto);
  }

  @Get()
  findAll() {
    return this.orderFeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderFeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderFeeDto: UpdateOrderFeeDto) {
    return this.orderFeesService.update(+id, updateOrderFeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderFeesService.remove(+id);
  }
}
