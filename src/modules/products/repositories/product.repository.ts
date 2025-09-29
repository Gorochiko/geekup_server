

import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../entities/product.entity';   
import { CreateProductDto } from '../dto/create-product.dto';
import { Op, WhereOptions } from 'sequelize';
import { ProductVariant } from 'src/modules/products-variants/entities/products-variant.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
export interface ProductsRepository {
    create(product: CreateProductDto): Promise<Product>;
    findProductByIdCategory(categoriesID: string): Promise<Product[]>;
   searchWithFilters(filters: {
    searchTerm?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    size?: number;
    color?: string;
    offset?: number;
    limit?: number;
  }): Promise<{ products: Product[]; total: number }>;
}

export class ProductRepository implements ProductsRepository {
    constructor(
        @InjectModel(Product)
        private productModel: typeof Product,
    ) {}
    async create(productData: CreateProductDto): Promise<Product> {
        const product = await this.productModel.create({
            name: productData.name,
            description: productData.description,
            category_id: productData.category_id,
        } as unknown as Product);
        return product;
    }


    async findProductByIdCategory(categoriesID:string): Promise<Product[]> {
        return await this.productModel.findAll({
            where: { category_id: categoriesID },
        });
    }


     async searchWithFilters(filters: {
    searchTerm?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    size?: number;
    color?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ products: Product[]; total: number }> {
     const where: Record<PropertyKey, any> = {};
    const includeWhere: Record<string, any> = {};

    if (filters.searchTerm) {
      where[Op.or] = [
        { name: { [Op.like]: `%${filters.searchTerm}%` } },
        { description: { [Op.like]: `%${filters.searchTerm}%` } },
      ];
    }

    if (filters.categoryId) {
      where.category_id = filters.categoryId;
    }

    if (filters.minPrice || filters.maxPrice) {
      includeWhere.price = {};
      if (filters.minPrice) includeWhere.price[Op.gte] = filters.minPrice;
      if (filters.maxPrice) includeWhere.price[Op.lte] = filters.maxPrice;
    }

    if (filters.size) {
      includeWhere.size = filters.size;
    }

    if (filters.color) {
      includeWhere.color = filters.color;
    }

    const { rows: products, count: total } =
      await this.productModel.findAndCountAll({
        where,
        include: [
          {
            model: ProductVariant,
            where: Object.keys(includeWhere).length ? includeWhere : undefined,
            required: !!Object.keys(includeWhere).length,
          },
          {
            model: Category,
            attributes: ['id', 'name'],
          },
        ],
        limit: filters.limit,
        offset: filters.offset,
        distinct: true, // count chính xác khi join
      });

    return { products, total };
  }
}