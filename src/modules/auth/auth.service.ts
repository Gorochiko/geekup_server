import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { v4 as uuidv4 } from 'uuid';
import { CodeAuthDto } from './dto/codeAuth.dto';
import dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.passowrd);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
    if (signUpDto.password !== signUpDto.rePassword) {
      throw new BadRequestException('Password and Confirm Password do not match');
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    if (!passwordRegex.test(signUpDto.password)) {
      throw new BadRequestException('Password is not strong enough');
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const newUser = await this.userService.create({
      name: signUpDto.name,
      email: signUpDto.email,
      password: hashedPassword,
      role: 'user',
    });

    // Gửi email kích hoạt
    await this.mailerService.sendMail({
      to: newUser.email,
      subject: 'Kích hoạt tài khoản',
      template: 'register',
      context: {
        name: newUser.name,
        activationCode: uuidv4(), // bạn có thể lưu activationCode vào DB nếu muốn
      },
    });

    return { message: `Account created successfully with id: ${newUser.id}` };
  }

 

  async getCurrentUser(userId: string): Promise<User | null> {
    const user = await this.userService.findById(userId);
    if (!user) return null;

    // Chỉ trả ra các field cần thiết
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      addresses: user.addresses,
      orders: user.orders,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as User;
  }

  async refreshToken(refreshToken: string, email: string): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid refresh token');

    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
