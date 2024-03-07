import { User } from 'src/User/User';

export interface DataBase {
  users: { [id: string]: User };
}
