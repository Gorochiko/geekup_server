import { IsUUID, IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class CreateProductVariantDto {
  @IsString()
  size: number;

  @IsString()
  color: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsUrl()
  image_url?: string;

  @IsUUID()
  products_id: string;
}
