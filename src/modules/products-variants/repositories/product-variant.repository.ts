
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductVariant } from '../entities/products-variant.entity';
import { CreateProductVariantDto } from '../dto/create-products-variant.dto';

export interface RepositoryVariant{
    create(data: CreateProductVariantDto):Promise<ProductVariant>,
    findAll(): Promise<ProductVariant[]>
}

@Injectable()
export class ProductVariantRepository implements RepositoryVariant {
  constructor(
    @InjectModel(ProductVariant)
    private readonly variantModel: typeof ProductVariant,
  ) {}

  async create(data: CreateProductVariantDto): Promise<ProductVariant> {
    return this.variantModel.create(data as any);
  }

  async findAll(): Promise<ProductVariant[]> {
    return this.variantModel.findAll({ include: { all: true } });
  }


}
