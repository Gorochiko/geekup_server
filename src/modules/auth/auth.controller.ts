import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { CurrentUser } from './decorators/current-user.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)

  // async signIn(@Request() req) {
  //   const result = await this.authService.signIn(req.user);
  //   return result;
  // }
  
  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
 
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    const result = await this.authService.signUp(signUpDto);
    return result;
  }

  
  @Get('me')
  @UseGuards(JwtAuthGuard)

  getCurrentUser(@CurrentUser() user: any) {
    const result = this.authService.getCurrentUser(user);
    return result;
  }


 
  /**
   * Refreshes the access token using a valid refresh token
   * @param refreshTokenDto - DTO containing the refresh token
   * @returns New authentication tokens
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(
      refreshTokenDto.refreshToken,
      refreshTokenDto.username,
    );
  }
 
}
