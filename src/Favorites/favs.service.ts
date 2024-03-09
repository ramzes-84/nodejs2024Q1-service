import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataBase } from 'src/database/types';
import { dB } from 'src/database/dB';
import { ErrMsg, FindID } from 'src/types';
import { FavoritesResponse } from './types';

@Injectable()
export class FavoriteService {
  protected dB: DataBase = dB;

  getAllFavs() {
    return getFavsEntities(dB);
  }
  addTrack(params: FindID) {
    if (!this.dB.tracks[params.id])
      throw new HttpException(
        ErrMsg.TRACK_NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.dB.favs.tracks.add(params.id);
  }
  addArtist(params: FindID) {
    if (!this.dB.artists[params.id])
      throw new HttpException(
        ErrMsg.ARTIST_NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.dB.favs.artists.add(params.id);
  }
  addAlbum(params: FindID) {
    if (!this.dB.albums[params.id])
      throw new HttpException(
        ErrMsg.ALBUM_NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.dB.favs.albums.add(params.id);
  }
  deleteTrack(params: FindID) {
    if (!this.dB.favs.tracks.has[params.id])
      throw new HttpException(ErrMsg.NOT_IN_FAVS, HttpStatus.NOT_FOUND);
    this.dB.favs.tracks.delete(params.id);
  }
  deleteArtist(params: FindID) {
    if (!this.dB.favs.artists.has[params.id])
      throw new HttpException(ErrMsg.NOT_IN_FAVS, HttpStatus.NOT_FOUND);
    this.dB.favs.artists.delete(params.id);
  }
  deleteAlbum(params: FindID) {
    if (!this.dB.favs.albums.has[params.id])
      throw new HttpException(ErrMsg.NOT_IN_FAVS, HttpStatus.NOT_FOUND);
    this.dB.favs.albums.delete(params.id);
  }
}

export const getFavsEntities = (dB: DataBase): FavoritesResponse => {
  const response: FavoritesResponse = { albums: [], artists: [], tracks: [] };
  dB.favs.albums.forEach((id) => response.albums.push(dB.albums[id]));
  dB.favs.artists.forEach((id) => response.artists.push(dB.artists[id]));
  dB.favs.tracks.forEach((id) => response.tracks.push(dB.tracks[id]));
  return response;
};
