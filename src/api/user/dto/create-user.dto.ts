import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  username: string;

  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;

  @IsOptional()
  @IsString()
  refresh_token: string;
}
