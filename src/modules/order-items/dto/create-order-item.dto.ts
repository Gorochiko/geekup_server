import { IsNumber ,IsUUID} from "class-validator";


export class CreateOrderItemDto {
  @IsUUID(4)
  products_variants_id: string;

  @IsNumber()
  unit_price: number;

  @IsNumber()
  quantity: number;
}
