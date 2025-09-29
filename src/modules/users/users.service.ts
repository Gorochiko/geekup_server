// users/users.service.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { USER_MODEL, IUserRepository } from './users.interface';
import { CreateUserDto } from './dto/create.dto.user';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_MODEL)
    private readonly userRepo: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepo.create(createUserDto);
      return user;
    } catch (error) {
      throw new Error(`Could not create user: ${error.message}`);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepo.findAll();
    } catch (error) {
      throw new Error(`Could not fetch users: ${error.message}`);
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userRepo.findById(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Could not fetch user: ${error.message}`);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepo.findByEmail(email);
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Could not fetch user by email: ${error.message}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.findById(id); // Check if user exists
      return await this.userRepo.update(id, updateUserDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Could not update user: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findById(id); // Check if user exists
      await this.userRepo.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Could not delete user: ${error.message}`);
    }
  }

  async findUserWithOrders(id: string): Promise<User> {
    try {
      const user = await this.userRepo.findUserWithOrders(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Could not fetch user with orders: ${error.message}`);
    }
  }

  async findUserWithAddresses(id: string): Promise<User> {
    try {
      const user = await this.userRepo.findUserWithAddresses(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Could not fetch user with addresses: ${error.message}`);
    }
  }

  async findUserWithOrdersAndAddresses(id: string): Promise<User> {
    try {
      const userWithOrders = await this.userRepo.findUserWithOrders(id);
      if (!userWithOrders) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      // Nếu repository không có method này, có thể combine data từ các method khác
      return userWithOrders;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Could not fetch user with orders and addresses: ${error.message}`);
    }
  }

  async updateRole(id: string, role: string): Promise<User> {
    try {
      return await this.update(id, { role } as UpdateUserDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Could not update user role: ${error.message}`);
    }
  }

  async findByRole(role: string): Promise<User[]> {
    try {
      return await this.userRepo.findByRole(role);
    } catch (error) {
      throw new Error(`Could not fetch users by role: ${error.message}`);
    }
  }
}