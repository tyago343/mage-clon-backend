import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateUserDto, PaginationQueryDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getUsers(@Query() pagination: PaginationQueryDto): Promise<User[]> {
    return this.usersService.getUsers(pagination);
  }
  @Get(':id')
  getUser(@Param('id') id: number): Promise<User> {
    return this.usersService.getUser(id);
  }
  @Post()
  createUser(@Body() message: CreateUserDto): Promise<User> {
    return this.usersService.createUser(message);
  }
  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body() messsage: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, messsage);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.removeUser(id);
  }
}
