import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesFunctions } from './repositories/categories.repository';
export const CATEGORY_TOKEN = "CATEGORY-RESPONSITORY"


@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORY_TOKEN)
    private readonly categoriesRepository: CategoriesFunctions) {}

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async findAll() {
    const categories = await this.categoriesRepository.findAll();
    return {
      success: true,
      data: categories,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, _updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
