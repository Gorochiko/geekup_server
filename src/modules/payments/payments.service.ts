import { Injectable, HttpException, Inject } from '@nestjs/common';
import * as crypto from 'crypto';
import axios from 'axios';
import { ORDER_CODE, OrderRepo } from '../orders/order.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(ORDER_CODE)
    private readonly orderRepo: OrderRepo,
    private readonly mailerService: MailerService,
  ) {}
  private readonly partnerCode = 'MOMO';
  private readonly accessKey = 'F8BBA842ECF85';
  private readonly secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  private readonly redirectUrl =
    'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
  private readonly ipnUrl =
    'https://geekup-server-3.onrender.com/payments/momo/ipn';
  private readonly endpoint =
    'https://test-payment.momo.vn/v2/gateway/api/create';

  async createMoMoPayment(orderId: string, amount: number, orderInfo: string) {
    const requestId = orderId;
    const extraData = '';
    const paymentCode =
      'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
    const requestType = 'payWithMethod';
    const rawSignature =
      `accessKey=${this.accessKey}` +
      `&amount=${amount}` +
      `&extraData=${extraData}` +
      `&ipnUrl=${this.ipnUrl}` +
      `&orderId=${orderId}` +
      `&orderInfo=${orderInfo}` +
      `&partnerCode=${this.partnerCode}` +
      `&redirectUrl=${this.redirectUrl}` +
      `&requestId=${requestId}` +
      `&requestType=${requestType}`;

    // Hash SHA256
    const signature = crypto
      .createHmac('sha256', this.secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode: this.partnerCode,
      requestId,
      amount: amount.toString(),
      orderId,
      orderInfo,
      redirectUrl: this.redirectUrl,
      ipnUrl: this.ipnUrl,
      lang: 'vi',
      extraData,
      requestType,
      paymentCode,
      signature,
    };
    console.log('MoMo Request Body:', requestBody);
    try {
      const response = await axios.post(this.endpoint, requestBody, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || error.message, 500);
    }
  }

 async handleMoMoIpn(body: any) {
  const orderId = body.orderId;

  const order = await this.orderRepo.findById(orderId);

  if (!order) {
    console.error('Order not found for ID:', orderId);
    return { message: 'Order not found' };
  }
  const plainOrder = order.get({ plain: true });
  if (!plainOrder.user) {
    console.error('User not found for order:', orderId);
    return { message: 'User not found' };
  }
  const items = plainOrder.orderItems.map(item => ({
  name: item.product?.name || 'Sản phẩm',
  quantity: item.quantity,
  price: item.unit_price,
}));
  if (body.resultCode === 0) {
    try {
      await this.mailerService.sendMail({
        to: plainOrder.user.email,
        subject: 'Xác nhận đặt hàng',
        template: 'order',
        context: {
          userName: plainOrder.user.name,
          orderId: plainOrder.id,
          orderStatus: plainOrder.status,
          totalAmount: plainOrder.total_amount,
          createdAt: plainOrder.createdAt,
          items: items,
          fees: plainOrder.fees || [],
          payments: plainOrder.payments || [],
        },
      });

      await this.orderRepo.updateStatus(orderId, 'paid');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  } else if (body.resultCode) {
    await this.orderRepo.updateStatus(orderId, 'processing');
  } else {
    await this.orderRepo.updateStatus(orderId, 'failed');
  }

  return { message: 'IPN received' };
}

}
