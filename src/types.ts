import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindID {
  @IsUUID('4')
  @ApiProperty({ example: '0a35dd62-e09f-444b-a628-f4e7c6954f57' })
  id: string;
}

export enum ErrMsg {
  ALBUM_NOT_FOUND = 'Album not found',
  USER_NOT_FOUND = 'User not found',
  ARTIST_NOT_FOUND = 'Artist not found',
  TRACK_NOT_FOUND = 'Track not found',
  WRONG_PASSW = 'Incorrect old password',
  NOT_IN_FAVS = 'ID not found in favorites',
  SERVER_ERR = 'Internal Server Error',
}
