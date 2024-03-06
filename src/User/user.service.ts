import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getAllUsers(): string {
    return 'getAllUsers';
  }
  getUserById(): string {
    return 'getUserById';
  }
}
