import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsVariantDto } from './create-products-variant.dto';

export class UpdateProductsVariantDto extends PartialType(CreateProductsVariantDto) {}
