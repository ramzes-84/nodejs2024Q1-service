import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './Dto/types';
import { DataBase } from 'src/database/types';
import { dB } from 'src/database/dB';
import { User } from './User';
import { ErrMsg, FindID } from 'src/types';

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
  updatePassw(params: FindID, updatePasswordDto: UpdatePasswordDto) {
    const user = this.dB.users[params.id];
    if (!user) return;
    if (user.password === updatePasswordDto.oldPassword) {
      user.password = updatePasswordDto.newPassword;
      user.version = user.version + 1;
      user.updatedAt = Date.now();
      return user;
    } else {
      return null;
    }
  }
  delete(params: FindID) {
    if (!this.dB.users[params.id])
      throw new HttpException(ErrMsg.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    delete this.dB.users[params.id];
  }
}
