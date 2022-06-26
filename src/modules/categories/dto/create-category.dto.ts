import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  readonly name: string;
  @Type(() => Number)
  @IsNumber()
  readonly position?: number;
  readonly createAt?: Date;
  readonly updatedAt?: Date;
}
