import { Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): string {
    return this.userService.getAllUsers();
  }
  @Get(':id')
  getUserById(@Param('id') id: string): string {
    return this.userService.getUserById(id);
  }
  @Post()
  @HttpCode(201)
  create(@Req() req: Request): string {
    return this.userService.create(req);
  }
}
