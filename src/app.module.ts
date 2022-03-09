import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { AdminActionModule } from './modules/admin-action/admin-action.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AdminActionModule,
    DatabaseModule,
  ],
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = Number(this.configService.get('PORT')) || 4000;
  }
}
