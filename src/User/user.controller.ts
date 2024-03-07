import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  // Req,
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
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto): string {
    // console.log(createUserDto);
    // return 'Create user';
    return this.userService.create(createUserDto);
  }
}
