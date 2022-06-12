import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    if (user) {
      const isPasswordCorrect = await user.comparePassword(password);
      if (isPasswordCorrect) {
        const { password, ...rest } = user;
        return rest;
      }
    }
    return null;
  }
}
