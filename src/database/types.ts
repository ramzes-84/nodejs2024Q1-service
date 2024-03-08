import { Album } from 'src/Album/album';
import { Artist } from 'src/Artist/Artist';
import { User } from 'src/User/User';

export interface DataBase {
  users: { [id: string]: User };
  artists: { [id: string]: Artist };
  albums: { [id: string]: Album };
}
