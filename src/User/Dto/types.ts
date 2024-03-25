import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'admin' })
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '12345' })
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '12345' })
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '55555' })
  newPassword: string;
}
