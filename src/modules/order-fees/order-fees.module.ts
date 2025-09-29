import { Module } from '@nestjs/common';
import { OrderFeesService } from './order-fees.service';
import { OrderFeesController } from './order-fees.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderFee } from './entities/order-fee.entity';

@Module({
  imports: [SequelizeModule.forFeature([OrderFee])],
  controllers: [OrderFeesController],
  providers: [OrderFeesService],
  exports: [OrderFeesService],
})
export class OrderFeesModule {}
