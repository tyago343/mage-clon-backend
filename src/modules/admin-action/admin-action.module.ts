import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAction } from './admin-action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminAction])],
})
export class AdminActionModule {}
