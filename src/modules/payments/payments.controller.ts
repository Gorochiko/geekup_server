import { Controller,  Post, Body,   } from '@nestjs/common';
import { PaymentsService } from './payments.service';


@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

   @Post('momo/ipn')
  async handleMoMoIpn(@Body() body: any) {
    console.log('MoMo IPN received:', body);
    return await this.paymentsService.handleMoMoIpn(body);
  }
}
