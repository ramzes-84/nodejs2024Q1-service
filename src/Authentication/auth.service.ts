import {
  Injectable,
  // UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../User/user.service';
import { PrismaClient } from '@prisma/client';
import { User } from 'src/User/User';
import { ErrMsg } from 'src/types';
import { CreateUserDto } from 'src/User/Dto/types';

@Injectable()
export class AuthService {
  protected prisma = new PrismaClient();

  constructor(private userService: UserService) {}

  async signUp(user: CreateUserDto): Promise<Omit<User, 'password'>> {
    const foundUser = await this.userService.findByLogin(user.login);
    if (foundUser.length > 0) {
      throw new UnprocessableEntityException(ErrMsg.DUPLICATED_LOGIN);
    }
    // if (foundUser.password !== user.password) {
    //   throw new UnauthorizedException(ErrMsg.WRONG_PASSW);
    // }
    const newUser = await this.userService.create(user);
    return newUser;
  }
}
