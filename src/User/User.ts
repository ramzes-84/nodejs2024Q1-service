import { Exclude } from 'class-transformer';
import { CreateUserDto } from './Dto/types';
import { v4 } from 'uuid';

export class User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  @Exclude()
  password: string;

  constructor(createUserDto: CreateUserDto) {
    this.id = v4();
    this.login = createUserDto.login;
    this.password = createUserDto.password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = this.createdAt;
  }
}
