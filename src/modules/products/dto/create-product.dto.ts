import { IsString } from 'class-validator';
import { Category } from 'src/modules/categories/entities';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  price: string;
  @IsString()
  description: string;
  categories: any;
}
