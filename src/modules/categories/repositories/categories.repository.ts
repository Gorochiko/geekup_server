
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../entities/category.entity';
import { Product } from '../../products/entities/product.entity';
import { ProductVariant } from '../../products-variants/entities/products-variant.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
export interface CategoriesFunctions {
  findAll(): Promise<Category[]>;
 
  create(CreateCategoryDto: CreateCategoryDto): Promise<Category>;
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

     async create(categoryData: CreateCategoryDto): Promise<Category> {
    const category = await this.categoryModel.create({
      name: categoryData.name,
    }as Category);
    return category;
  }


}