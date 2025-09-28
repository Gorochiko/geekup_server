import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderFeeDto } from './create-order-fee.dto';

export class UpdateOrderFeeDto extends PartialType(CreateOrderFeeDto) {}
