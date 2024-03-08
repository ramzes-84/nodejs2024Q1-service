import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataBase } from 'src/database/types';
import { dB } from 'src/database/dB';
import { ErrMsg, FindID } from 'src/types';
import { CreateAlbumDto, UpdateAlbumDto } from './Dto/types';
import { Album } from './album';

@Injectable()
export class AlbumService {
  protected dB: DataBase = dB;

  getAllAlbums() {
    return Object.values(this.dB.albums);
  }
  getAlbumById(params: FindID) {
    const album = this.dB.albums[params.id];
    if (!album)
      throw new HttpException(ErrMsg.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    return album;
  }
  create(album: CreateAlbumDto) {
    const newAlbum = new Album(album);
    this.dB.albums[newAlbum.id] = newAlbum;
    return newAlbum;
  }
  updateAlbum(params: FindID, updateAlbumDto: UpdateAlbumDto) {
    const album = this.dB.albums[params.id];
    if (!album)
      throw new HttpException(ErrMsg.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    Object.assign(album, updateAlbumDto);
    return album;
  }
  delete(params: FindID) {
    if (!this.dB.albums[params.id])
      throw new HttpException(ErrMsg.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    delete this.dB.albums[params.id];
  }
}
