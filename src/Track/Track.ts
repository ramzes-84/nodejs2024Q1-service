import { v4 } from 'uuid';
import { CreateTrackDto } from './Dto/types';

export class Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(createTrackDto: CreateTrackDto) {
    this.id = v4();
    this.name = createTrackDto.name;
    this.duration = createTrackDto.duration;
    this.artistId = createTrackDto.artistId || null;
    this.albumId = createTrackDto.albumId || null;
  }
}
