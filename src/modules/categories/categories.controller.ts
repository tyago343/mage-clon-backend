import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto';
import { Category } from './entities';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @UseGuards(AuthenticatedGuard)
  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }
  @UseGuards(AuthenticatedGuard)
  @Post()
  createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }
}
