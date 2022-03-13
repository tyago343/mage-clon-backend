import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
export class UsersServiceMock {
  private users: User[] = [
    {
      id: 1,
      name: 'santiago',
    },
    {
      id: 2,
      name: 'Berta',
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

  async getUsers(): Promise<User[]> {
    return Promise.resolve(this.users);
  }
}
