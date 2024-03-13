import { Album } from 'src/Album/album';
import { Artist } from 'src/Artist/Artist';
import { Track } from 'src/Track/Track';
import { User } from 'src/User/User';

export interface DataBase {
  users: { [id: string]: User };
  artists: { [id: string]: Artist };
  albums: { [id: string]: Album };
  tracks: { [id: string]: Track };
  favs: {
    artists: Set<string>;
    albums: Set<string>;
    tracks: Set<string>;
  };
}
