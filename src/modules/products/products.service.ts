import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './repositories/product.repository';
import { Product } from './entities/product.entity';

export const PRODUCTS_TOKEN = 'PRODUCTS_TOKEN';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_TOKEN)
    private readonly productsRepository: ProductsRepository,
  ) {}

  //*
  // Step1: Inject the ProductsRepository using the PRODUCTS_TOKEN
  // Step2: Implement the create method to use the repository's create function
  //Step3: Ensure the create method accepts CreateProductDto and returns a Promise<Product>
  //Step4: Remove the placeholder return statements
  // *//
  create(createProductDto: CreateProductDto): Promise<Product> {
    if (!createProductDto.name || !createProductDto.category_id) {
      throw new BadRequestException(
        'Name, Price, and Category ID are required',
      );
    }
    return this.productsRepository.create(createProductDto);
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    if (!categoryId) {
      throw new BadRequestException('Category ID is required');
    }
    const products =
      await this.productsRepository.findProductByIdCategory(categoryId);
    if (!products || products.length === 0) {
      throw new NotFoundException(
        `No products found for categoryId: ${categoryId}`,
      );
    }
    return products;
  }

   async searchProducts(filters: {
    searchTerm?: string;
    category?: string;
    min_price?: number;
    max_price?: number;
    size?: number;
    color?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const offset = (page - 1) * limit;

    const { products, total } = await this.productsRepository.searchWithFilters({
      searchTerm: filters.searchTerm,
      categoryId: filters.category,
      minPrice: filters.min_price,
      maxPrice: filters.max_price,
      size: filters.size,
      color: filters.color,
      limit,
      offset,
    });

    return {
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
