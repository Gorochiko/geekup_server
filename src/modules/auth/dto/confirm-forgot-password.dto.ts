import { IsString, Length, MinLength } from "class-validator";

export class ConfirmForgotPasswordDto {
 
  @IsString()
  username: string;


  @IsString()
  @Length(6, 6)
  code: string;

 
  @IsString()
  @MinLength(8)
  newPassword: string;
} 