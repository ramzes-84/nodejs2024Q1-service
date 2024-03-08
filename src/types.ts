import { IsUUID } from 'class-validator';

export class FindID {
  @IsUUID('4')
  id: string;
}

export enum ErrMsg {
  ALBUM_NOT_FOUND = 'Album not found',
  USER_NOT_FOUND = 'User not found',
  ARTIST_NOT_FOUND = 'Artist not found',
  TRACK_NOT_FOUND = 'Track not found',
  WRONG_PASSW = 'Incorrect old password',
}
