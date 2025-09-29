import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './repositories/product.repository';
import { PRODUCTS_TOKEN } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: PRODUCTS_TOKEN,
      useClass: ProductRepository,
    },
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
