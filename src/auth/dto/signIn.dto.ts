import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SignIn } from '../entities/signIn.entity';

export class SignInDto implements SignIn {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
