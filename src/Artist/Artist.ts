import { v4 } from 'uuid';
import { CreateArtistDto } from './Dto/types';

export class Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(createArtistDto: CreateArtistDto) {
    console.log(createArtistDto.grammy);
    console.log(!!createArtistDto.grammy);
    this.id = v4();
    this.name = createArtistDto.name;
    this.grammy = !!createArtistDto.grammy || false;
  }
}
