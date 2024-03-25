import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './Dto/types';
import { User } from './User';
import { ErrMsg, FindID } from 'src/types';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  protected prisma = new PrismaClient();

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserById(params: FindID) {
    const foundEntity = await this.prisma.user.findUnique({
      where: { id: params.id },
    });
    if (foundEntity === null)
      throw new NotFoundException(ErrMsg.USER_NOT_FOUND);
    return foundEntity;
  }

  async create(user: CreateUserDto): Promise<Omit<User, 'password'>> {
    const newEntity = new User(user);
    const response = await this.prisma.user.create({
      data: {
        id: newEntity.id,
        login: newEntity.login,
        password: newEntity.password,
        version: newEntity.version,
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });
    return {
      ...response,
      createdAt: response.createdAt.getTime(),
      updatedAt: response.updatedAt.getTime(),
    };
  }

  async updatePassw(
    params: FindID,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    const foundEntity = await this.prisma.user.findUnique({
      where: { id: params.id },
    });
    if (!foundEntity) throw new NotFoundException(ErrMsg.USER_NOT_FOUND);
    if (foundEntity.password === updatePasswordDto.oldPassword) {
      const response = await this.prisma.user.update({
        where: { id: params.id },
        data: {
          password: updatePasswordDto.newPassword,
          version: foundEntity.version + 1,
        },
        select: {
          id: true,
          login: true,
          version: true,
          createdAt: true,
          updatedAt: true,
          password: false,
        },
      });
      return {
        ...response,
        createdAt: response.createdAt.getTime(),
        updatedAt: response.updatedAt.getTime(),
      };
    } else {
      throw new ForbiddenException(ErrMsg.WRONG_PASSW);
    }
  }

  async delete(params: FindID) {
    try {
      await this.prisma.user.delete({
        where: { id: params.id },
      });
    } catch {
      throw new NotFoundException(ErrMsg.USER_NOT_FOUND);
    }
  }
}
