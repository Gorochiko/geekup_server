
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../entities/category.entity';
import { Product } from '../../products/entities/product.entity';
import { ProductVariant } from '../../products-variants/entities/products-variant.entity';

export interface CategoriesFunctions {
  findAll(): Promise<Category[]>;
  findProductsByCategory(categoryId: number): Promise<Product[]>;
}

export class CategoriesRepository implements CategoriesFunctions {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.findAll({
      order: [['name', 'ASC']],
    });
  }

  async findProductsByCategory(categoryId: number): Promise<Product[]> {
    const category = await this.categoryModel.findByPk(categoryId, {
      include: [{
        model: Product,
        include: [ProductVariant],
      }],
    });
    return category?.products || [];
  }
}