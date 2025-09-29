import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsVariantsService } from './products-variants.service';
import { CreateProductVariantDto } from './dto/create-products-variant.dto';


@Controller('products-variants')
export class ProductsVariantsController {
  constructor(private readonly productsVariantsService: ProductsVariantsService) {}

  @Post()
  create(@Body() createProductsVariantDto: CreateProductVariantDto) {
    return this.productsVariantsService.create(createProductsVariantDto);
  }

  @Get()
  findAll() {
    return this.productsVariantsService.findAll();
  }

 
}
