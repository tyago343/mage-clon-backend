import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { CreateUserDto, PaginationQueryDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  getUserByEmail(): any {
    return { msj: 'Hi!' };
  }
  @UseGuards(AuthenticatedGuard)
  @Get('testing')
  getTest(@Request() req): any {
    return req.user;
  }
  @Get()
  getUsers(@Query() pagination?: PaginationQueryDto): Promise<User[]> {
    return this.usersService.getUsers(pagination);
  }
  @Get(':id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }
  @Post()
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.createUser(user);
  }
  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body() name: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, name);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.removeUser(id);
  }
}
