import { Module } from '@nestjs/common';
import { PRODUCT_VARIANT_CODE, ProductsVariantsService } from './products-variants.service';
import { ProductsVariantsController } from './products-variants.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductVariant } from './entities/products-variant.entity';
import { ProductVariantRepository } from './repositories/product-variant.repository';

@Module({
  imports: [SequelizeModule.forFeature([ProductVariant])],
  controllers: [ProductsVariantsController],
  providers: [ProductsVariantsService,
    {
      provide: PRODUCT_VARIANT_CODE,
      useClass: ProductVariantRepository
    }
  ],
})
export class ProductsVariantsModule {}
