// users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.dto.user';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Tạo user mới
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // Lấy tất cả user
  @Get()
  async findAll(@Query('role') role?: string): Promise<User[]> {
    if (role) {
      return this.usersService.findByRole(role);
    }
    return this.usersService.findAll();
  }

  // Lấy user theo ID
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  // Lấy user theo email
  @Get('/email/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  // Lấy user kèm orders
  @Get(':id/orders')
  async findUserWithOrders(@Param('id') id: string): Promise<User> {
    return this.usersService.findUserWithOrders(id);
  }

  // Lấy user kèm addresses
  @Get(':id/addresses')
  async findUserWithAddresses(@Param('id') id: string): Promise<User> {
    return this.usersService.findUserWithAddresses(id);
  }

  // Lấy user kèm orders + addresses
  @Get(':id/details')
  async findUserWithOrdersAndAddresses(@Param('id') id: string): Promise<User> {
    return this.usersService.findUserWithOrdersAndAddresses(id);
  }

  // Cập nhật user
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  // Cập nhật role
  @Put(':id/role')
  async updateRole(
    @Param('id') id: string,
    @Body('role') role: string,
  ): Promise<User> {
    return this.usersService.updateRole(id, role);
  }

  // Xóa user
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.usersService.remove(id);
    return { message: `User ${id} deleted successfully` };
  }
}
