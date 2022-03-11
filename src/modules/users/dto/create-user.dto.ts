import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;
  readonly actions?: string[];
  readonly createAt?: Date;
  readonly updatedAt?: Date;
}
