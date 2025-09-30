import { IsString, MinLength } from "class-validator";

export class SignInDto {
 
  @IsString()
  @MinLength(1)
  email: string;


  @IsString()
  password: string;
} 