import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { AdminActionModule } from './modules/admin-action/admin-action.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AdminActionModule,
    DatabaseModule,
    AuthModule,
    CategoriesModule,
  ],
  providers: [AuthService],
})
export class AppModule {
  static port: number;
  static cookieSecretKey: string;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = Number(this.configService.get('PORT')) || 4000;
    AppModule.cookieSecretKey = String(
      this.configService.get('COOKIE_SECRET_KEY'),
    );
  }
}
