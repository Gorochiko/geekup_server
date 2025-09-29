import { PartialType } from '@nestjs/mapped-types';
import { CreateProductVariantDto } from './create-products-variant.dto';

export class UpdateProductsVariantDto extends PartialType(CreateProductVariantDto) {}
