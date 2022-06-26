import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { CategoriesService } from './categories.service';
import { Category } from './entities';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @UseGuards(AuthenticatedGuard)
  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }
}
