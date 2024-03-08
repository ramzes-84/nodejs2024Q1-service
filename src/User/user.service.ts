import { Injectable } from '@nestjs/common';
import { CreateUserDto, FindID } from './Dto/types';
import { DataBase } from 'src/database/types';
import { dB } from 'src/database/dB';
import { User } from './User';

@Injectable()
export class UserService {
  protected dB: DataBase = dB;

  getAllUsers() {
    return Object.values(this.dB.users);
  }
  getUserById(params: FindID) {
    const user = this.dB.users[params.id];
    return user;
  }
  create(user: CreateUserDto) {
    const newUser = new User(user);
    this.dB.users[newUser.id] = newUser;
    return newUser;
  }
}
