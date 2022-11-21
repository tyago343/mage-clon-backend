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
import { UpdateProductDto, CreateProductDto } from './dto';
import { Product } from './entities';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @UseGuards(AuthenticatedGuard)
  @Get(':uuid')
  getProductByUUID(@Param('uuid') uuid: string): Promise<Product> {
    return this.productService.getProductByUUID(uuid);
  }
  @UseGuards(AuthenticatedGuard)
  @Get()
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }
  @UseGuards(AuthenticatedGuard)
  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return this.productService.createProduct(product);
  }
  @UseGuards(AuthenticatedGuard)
  @Patch(':uuid')
  updateProduct(
    @Param('uuid') uuid: string,
    @Body() product: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(uuid, product);
  }
  @UseGuards(AuthenticatedGuard)
  @Delete(':uuid')
  deleteProduct(@Param('uuid') uuid: string) {
    return this.productService.removeProduct(uuid);
  }
}
