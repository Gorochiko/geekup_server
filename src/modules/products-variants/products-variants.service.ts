import { Inject, Injectable } from '@nestjs/common';
import { CreateProductVariantDto } from './dto/create-products-variant.dto';
import { UpdateProductsVariantDto } from './dto/update-products-variant.dto';
import { ProductVariantRepository, RepositoryVariant } from './repositories/product-variant.repository';
import { throwIfEmpty } from 'rxjs';

export const PRODUCT_VARIANT_CODE= "PRODUCT_VARIANT_CODE_REPOSITORY"

@Injectable()
export class ProductsVariantsService {

    constructor(
      @Inject(PRODUCT_VARIANT_CODE)
      private readonly variantRepo: RepositoryVariant
    ) {}
    async create(dto: CreateProductVariantDto) {
    return this.variantRepo.create(dto);
  }

 async findAll() {
    const response = await this.variantRepo.findAll();
    if(!response){
      throwIfEmpty()
    }
    return response
  }
 
  async findByid(id:string){
    const response = await this.variantRepo.findByid(id);
    return response
  }

}
