import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from '../entities';

export class CreateCategoryDto {
  @IsString()
  readonly name: string;
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  readonly position?: number;
  readonly createAt?: Date;
  readonly updatedAt?: Date;
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  readonly parent_id?: number;
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  readonly root?: boolean; 
}
