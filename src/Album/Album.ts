import { v4 } from 'uuid';
import { CreateAlbumDto } from './Dto/types';

export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(createAlbumDto: CreateAlbumDto) {
    this.id = v4();
    this.name = createAlbumDto.name;
    this.year = +createAlbumDto.year;
    this.artistId = createAlbumDto.artistId || null;
  }
}
