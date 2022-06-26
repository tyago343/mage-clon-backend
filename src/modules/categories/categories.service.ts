import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  createCategory(category) {
    const createdCategory = this.categoryRepository.create(category);
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
    this.categoryRepository.remove(category);
  }
}
