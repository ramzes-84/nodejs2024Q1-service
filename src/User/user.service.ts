import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getAllUsers(): string {
    return 'getAllUsers';
  }
  getUserById(id: string): string {
    console.log(id);
    return 'getUserById';
  }
  create(req: Request): string {
    console.log(req.body);
    return 'createUser';
  }
}
