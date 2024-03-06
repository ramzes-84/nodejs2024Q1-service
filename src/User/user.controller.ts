import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  getAllUsers(): string {
    return this.appService.getAllUsers();
  }
  @Get('id')
  getUserById(): string {
    return this.appService.getUserById();
  }
}
