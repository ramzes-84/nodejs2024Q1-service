import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './Dto/types';
import { ErrMsg, FindID } from 'src/types';

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
      throw new HttpException(ErrMsg.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    return searchResult;
  }

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  updatePassw(
    @Param() params: FindID,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = this.userService.updatePassw(params, updatePasswordDto);
    if (typeof user === 'undefined') {
      throw new HttpException(ErrMsg.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else if (!user) {
      throw new HttpException(ErrMsg.WRONG_PASSW, HttpStatus.FORBIDDEN);
    }
    return user;
  }

  @Delete(':id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: FindID) {
    this.userService.delete(params);
  }
}
