import { IsNumber, IsString } from 'class-validator';

export class CreateOrderFeeDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsString()
  type: string;
}
