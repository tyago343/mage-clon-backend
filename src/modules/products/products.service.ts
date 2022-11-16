import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }
  async getProductByUUID(uuid: string): Promise<Product> {
    return await this.productRepository.findOne(uuid);
  }
  async createProduct(product: CreateProductDto): Promise<Product> {
    const createdProduct = this.productRepository.create(product);
    return this.productRepository.save(createdProduct);
  }
  async updateProduct(uuid: string, productData) {
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
