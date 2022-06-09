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
  async getUserById(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne(id, {
      relations: ['actions'],
    });
    if (!user) {
      throw new NotFoundException('Resource not found');
    }
    return user;
  }
  async getUserByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOne(email, {
      relations: ['actions'],
    });
    if (!user) {
      throw new NotFoundException('Resource not found');
    }
    return user;
  }
  createUser(user: CreateUserDto) {
    const { name, lastName, email, password } = user;
    const createdUser: User = this.userRepository.create({
      name,
      lastName,
      email,
      password,
    });
    return this.userRepository.save(createdUser);
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
