import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category } from './entities';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  getCategoryById(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.getCategoryById(id);
  }
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
  @Patch(':id')
  updateCategory(
    @Param('id') id: number,
    @Body() category: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.updateCategory(id, category);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.categoriesService.removeCategory(id);
  }
}
