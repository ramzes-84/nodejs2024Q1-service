import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, FindID } from './Dto/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @Header('content-type', 'application/json')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  getUserById(@Param() params: FindID) {
    const searchResult = this.userService.getUserById(params);
    if (!searchResult)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return searchResult;
  }

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): string {
    return this.userService.create(createUserDto);
  }
}
