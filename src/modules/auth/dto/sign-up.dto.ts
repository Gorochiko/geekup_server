import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
 @IsString()
  name:string


  @IsString()
  @MinLength(1)
  @IsEmail()
  email: string;

  @IsString()
  password: string;

 
  @IsString()
  rePassword: string;
}
