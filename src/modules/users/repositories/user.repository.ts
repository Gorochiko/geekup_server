// users/user.repository.ts
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.dto.user';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../users.interface';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create({
      ...createUserDto,
      passowrd: createUserDto.password,
      role: createUserDto.role || 'user',
    } as unknown as User);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async findById(id: string): Promise<User | null> {
    return await this.userModel.findByPk(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return await user.update(updateUserDto);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
  }

  async findUserWithOrders(id: string): Promise<User | null> {
    return await this.userModel.findByPk(id, {
      include: ['orders'],
    });
  }

  async findUserWithAddresses(id: string): Promise<User | null> {
    return await this.userModel.findByPk(id, {
      include: ['addresses'],
    });
  }

  async findByRole(role: string): Promise<User[]> {
    return await this.userModel.findAll({
      where: { role },
    });
  }
}