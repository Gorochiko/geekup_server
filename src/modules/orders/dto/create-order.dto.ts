import { IsArray,  ValidateNested,IsUUID } from "class-validator";

import { Type } from 'class-transformer';
import { CreateOrderItemDto } from "src/modules/order-items/dto/create-order-item.dto";
import { CreateOrderFeeDto } from "src/modules/order-fees/dto/create-order-fee.dto";
export class CreateOrderDto {
  @IsUUID(4) user_id: string;
  @IsUUID(4) address_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderFeeDto)
  fees: CreateOrderFeeDto[];
}
