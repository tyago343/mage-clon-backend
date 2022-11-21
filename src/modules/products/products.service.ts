import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['categories'] });
  }
  async getProductByUUID(uuid: string): Promise<Product> {
    return await this.productRepository.findOne(uuid, {relations: ["categories"]});
  }
  async createProduct(product: CreateProductDto): Promise<Product> {
    const categories: Category[] = await this.categoryRepository.findByIds(
      product.categories,
    );
    const createdProduct = this.productRepository.create(product);
    createdProduct.categories = categories;
    return this.productRepository.save(createdProduct);
  }
  async updateProduct(uuid: string, productData: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id: uuid,
      ...productData,
    });
    if (!product) {
      throw new NotFoundException('Resource not found');
    }
    return await this.productRepository.save(product);
  }
  async removeProduct(uuid: string) {
    const product = await this.productRepository.findOne(uuid);
    if (!product) {
      throw new NotFoundException('Resource not found');
    }
    return this.productRepository.remove(product);
  }
}
