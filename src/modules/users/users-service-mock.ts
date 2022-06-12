import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
export class UsersServiceMock {
  private users: Omit<User, 'hashPassword' | 'comparePassword'>[] = [
    {
      id: 1,
      name: 'santiago',
      password: '1111',
      username: 'tyag343',
      lastName: 'Casanova',
      email: 'tyagocasanova@hotmail.com',
    },
    {
      id: 2,
      name: 'Berta',
      username: 'bertis',
      password: '1111',
      lastName: 'Casanova',
      email: 'tyagocasanova@hotmail.com',
    },
  ];
  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return Promise.resolve({
      id: Math.random() * (1000 - 1) + 1,
      ...createUserDto,
    });
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return Promise.resolve({
      id: id,
      ...updateUserDto,
    });
  }

  async getUsers(): Promise<Omit<User, 'hashPassword' | 'comparePassword'>[]> {
    return Promise.resolve(this.users);
  }
}
