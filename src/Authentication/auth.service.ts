import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from '../User/user.service';
import { PrismaClient } from '@prisma/client';
import { User } from 'src/User/User';
import { ErrMsg } from 'src/types';
import { CreateUserDto } from 'src/User/Dto/types';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  protected prisma = new PrismaClient();

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto): Promise<Omit<User, 'password'>> {
    const foundUser = await this.userService.findByLogin(user.login);
    if (foundUser) {
      throw new UnprocessableEntityException(ErrMsg.DUPLICATED_LOGIN);
    }
    const newUser = await this.userService.create(user);
    return newUser;
  }

  async login(user: CreateUserDto) {
    const foundUser = await this.userService.findByLogin(user.login);
    if (!foundUser) {
      throw new NotFoundException(ErrMsg.USER_NOT_FOUND);
    }

    const isPswCorrect = await compare(user.password, foundUser.password);

    if (!isPswCorrect) {
      throw new ForbiddenException(ErrMsg.WRONG_PASSW);
    }

    const payload = { userId: foundUser.id, login: foundUser.login };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
