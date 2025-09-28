import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import {CategoriesRepository } from './repositories/categories.repository';
import { CATEGORY_TOKEN } from './categories.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';

@Module({
   imports: [SequelizeModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService,
    {
      provide: CATEGORY_TOKEN,
      useClass: CategoriesRepository
    }
  ],
})
export class CategoriesModule {}
