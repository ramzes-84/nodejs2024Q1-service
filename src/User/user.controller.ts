import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
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
  getAllUsers(): string {
    return this.userService.getAllUsers();
  }
  @Get(':id')
  getUserById(@Param() params: FindID): string {
    return this.userService.getUserById(params);
  }
  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): string {
    return this.userService.create(createUserDto);
  }
}
