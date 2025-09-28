import { Module } from '@nestjs/common';
import { ProductsVariantsService } from './products-variants.service';
import { ProductsVariantsController } from './products-variants.controller';

@Module({
  controllers: [ProductsVariantsController],
  providers: [ProductsVariantsService],
})
export class ProductsVariantsModule {}
