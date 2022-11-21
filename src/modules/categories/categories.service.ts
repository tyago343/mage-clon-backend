import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto';
import { Category } from './entities';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }
  async getCategoryById(id: number): Promise<Category> {
    return await this.categoryRepository.findOne(id);
  }
  async getCategoryByName(name: string): Promise<Category> {
    return await this.categoryRepository.findOne({where: {name}});
  }
  async createCategory(category: CreateCategoryDto) {
    const { parent_id, ...rest } = category;
    const payload: any = { ...rest };
    if (parent_id) {
      const parentCategory = await this.categoryRepository.findOne(parent_id);
      if (parentCategory) {
        payload.parent = parentCategory;
      }
    }
    const createdCategory: any = this.categoryRepository.create(payload);
    return this.categoryRepository.save(createdCategory);
  }
  async updateCategory(id: number, categoryData) {
    const category = await this.categoryRepository.preload({
      id,
      ...categoryData,
    });
    if (!category) {
      throw new NotFoundException('Resource not found');
    }
    return await this.categoryRepository.save(category);
  }
  async removeCategory(id: number) {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException('Resource not found');
    }
    return this.categoryRepository.remove(category);
  }
}
