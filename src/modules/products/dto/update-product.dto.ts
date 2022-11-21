import { IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  name?: string;
  @IsString()
  price?: string;
  @IsString()
  description?: string;
  categories?: any;
}
