import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException(ErrMsg.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    return foundEntity;
  }

  async create(user: CreateUserDto) {
    const newEntity = new User(user);
    return await this.prisma.user.create({
      data: {
        id: newEntity.id,
        login: newEntity.login,
        password: newEntity.password,
        version: newEntity.version,
        // createdAt: newUser.createdAt,
        // updatedAt: newUser.updatedAt,
      },
    });
  }

  async updatePassw(params: FindID, updatePasswordDto: UpdatePasswordDto) {
    const foundEntity = await this.prisma.user.findUnique({
      where: { id: params.id },
    });
    if (!foundEntity)
      throw new HttpException(ErrMsg.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    if (foundEntity.password === updatePasswordDto.oldPassword) {
      return await this.prisma.user.update({
        where: { id: params.id },
        data: {
          password: updatePasswordDto.newPassword,
          version: foundEntity.version + 1,
        },
      });
    } else {
      throw new HttpException(ErrMsg.WRONG_PASSW, HttpStatus.FORBIDDEN);
    }
  }

  async delete(params: FindID) {
    try {
      await this.prisma.user.delete({
        where: { id: params.id },
      });
    } catch {
      throw new HttpException(ErrMsg.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
