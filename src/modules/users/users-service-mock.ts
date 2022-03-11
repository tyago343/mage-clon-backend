import { CreateUserDto, UpdateUserDto } from './dto';
export class UsersServiceMock {
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
}
