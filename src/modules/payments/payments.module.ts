import { forwardRef, Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [forwardRef(() => OrdersModule)], // dùng forwardRef nếu cần
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],  
})
export class PaymentsModule {}
