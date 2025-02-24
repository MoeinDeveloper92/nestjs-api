import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}

export class UserDto {
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  createdAt: Date;
}

export interface GeneralResponse<T> {
  success: boolean;
  data: T | T[];
  message?: string;
  token?: string;
}

export interface UserPayload {
  sub: number;
  email: string;
}
