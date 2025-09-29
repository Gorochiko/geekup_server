
import { IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateProductDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsString()
    category_id: string;
}
