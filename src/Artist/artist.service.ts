import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataBase } from 'src/database/types';
import { dB } from 'src/database/dB';
import { FindID } from 'src/User/Dto/types';
import { CreateArtistDto } from './Dto/types';
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
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    return artist;
  }
  create(artist: CreateArtistDto) {
    const newArtist = new Artist(artist);
    this.dB.artists[newArtist.id] = newArtist;
    return newArtist;
  }
  //   updatePassw(params: FindID, updatePasswordDto: UpdatePasswordDto) {
  //     const user = this.dB.users[params.id];
  //     if (!user) return;
  //     if (user.password === updatePasswordDto.oldPassword) {
  //       user.password = updatePasswordDto.newPassword;
  //       user.version = user.version + 1;
  //       user.updatedAt = Date.now();
  //       return user;
  //     } else {
  //       return null;
  //     }
  //   }
  //   delete(params: FindID) {
  //     if (!this.dB.users[params.id])
  //       throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //     delete this.dB.users[params.id];
  //   }
}
