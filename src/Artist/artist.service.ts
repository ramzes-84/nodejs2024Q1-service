import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataBase } from 'src/database/types';
import { dB } from 'src/database/dB';
import { ErrMsg, FindID } from 'src/types';
import { CreateArtistDto, UpdateArtistDto } from './Dto/types';
import { Artist } from './Artist';

@Injectable()
export class ArtistService {
  protected dB: DataBase = dB;

  getAllArtists() {
    return Object.values(this.dB.artists);
  }
  getArtistById(params: FindID) {
    const artist = this.dB.artists[params.id];
    if (!artist)
      throw new HttpException(ErrMsg.ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    return artist;
  }
  create(artist: CreateArtistDto) {
    const newArtist = new Artist(artist);
    this.dB.artists[newArtist.id] = newArtist;
    return newArtist;
  }
  updateArtist(params: FindID, updateArtistDto: UpdateArtistDto) {
    const artist = this.dB.artists[params.id];
    if (!artist)
      throw new HttpException(ErrMsg.ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    Object.assign(artist, updateArtistDto);
    return artist;
  }
  delete(params: FindID) {
    if (!this.dB.artists[params.id])
      throw new HttpException(ErrMsg.ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    delete this.dB.artists[params.id];
  }
}
