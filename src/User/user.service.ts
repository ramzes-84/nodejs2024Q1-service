import { Injectable } from '@nestjs/common';
import { CreateUserDto, FindID } from './Dto/types';

@Injectable()
export class UserService {
  getAllUsers(): string {
    return 'getAllUsers';
  }
  getUserById(id: FindID): string {
    console.log(id);
    return 'getUserById';
  }
  create(user: CreateUserDto): string {
    console.log(user);
    return 'createUser';
  }
}
