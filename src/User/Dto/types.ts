import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class FindID {
  @IsUUID('4')
  id: string;
}

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}
