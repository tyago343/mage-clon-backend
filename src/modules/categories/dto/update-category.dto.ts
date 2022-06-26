import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  readonly name?: string;
  @Type(() => Number)
  @IsNumber()
  readonly position?: number;
}
