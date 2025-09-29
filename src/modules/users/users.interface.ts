import { CreateUserDto } from "./dto/create.dto.user";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

export const USER_MODEL = 'USER_MODEL';


export interface IUserRepository {
  create(createUserDto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<void>;
  findUserWithOrders(id: string): Promise<User | null>;
  findUserWithAddresses(id: string): Promise<User | null>;
  findByRole(role: string): Promise<User[]>;
}