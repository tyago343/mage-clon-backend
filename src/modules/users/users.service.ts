import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, PaginationQueryDto, UpdateUserDto } from './dto';
import { User } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async getUsers({ limit, offset }: PaginationQueryDto): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['actions'],
      skip: offset,
      take: limit,
    });
  }
  async getUser(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne(id, {
      relations: ['actions'],
    });
    if (!user) {
      throw new NotFoundException('Resource not found');
    }
    return user;
  }
  createUser({ name }: CreateUserDto) {
    const user: User = this.userRepository.create({ name });
    return this.userRepository.save(user);
  }
  async updateUser(id: number, { name }: UpdateUserDto) {
    const user: User = await this.userRepository.preload({ id, name });
    if (!user) {
      throw new NotFoundException('Resource not found');
    }
    await this.userRepository.save(user);
    return user;
  }
  async removeUser(id: number): Promise<void> {
    const user: User = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('Resource not found');
    }
    this.userRepository.remove(user);
  }
}
