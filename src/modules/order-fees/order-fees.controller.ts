import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderFeesService } from './order-fees.service';
import { CreateOrderFeeDto } from './dto/create-order-fee.dto';

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

  @Get()
  findOne(id:string){
    return  this.orderFeesService.findOne(id)
  }

  @Patch()
  remove(id:string){
    return this.orderFeesService.remove(id)
  }

}
