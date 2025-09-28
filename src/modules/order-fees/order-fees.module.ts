import { Module } from '@nestjs/common';
import { OrderFeesService } from './order-fees.service';
import { OrderFeesController } from './order-fees.controller';

@Module({
  controllers: [OrderFeesController],
  providers: [OrderFeesService],
})
export class OrderFeesModule {}
