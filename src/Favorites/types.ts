import { Album } from 'src/Album/album';
import { Artist } from 'src/Artist/Artist';
import { Track } from 'src/Track/Track';

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
