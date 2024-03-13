import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataBase } from 'src/database/types';
import { dB } from 'src/database/dB';
import { ErrMsg, FindID } from 'src/types';
import { CreateTrackDto, UpdateTrackDto } from './Dto/types';
import { Track } from './Track';
import { removeIdPrints } from 'src/utils';

@Injectable()
export class TrackService {
  protected dB: DataBase = dB;

  getAllTracks() {
    return Object.values(this.dB.tracks);
  }
  getTrackById(params: FindID) {
    const track = this.dB.tracks[params.id];
    if (!track)
      throw new HttpException(ErrMsg.TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    return track;
  }
  create(track: CreateTrackDto) {
    const newTrack = new Track(track);
    this.dB.tracks[newTrack.id] = newTrack;
    return newTrack;
  }
  updateTrack(params: FindID, updateTrackDto: UpdateTrackDto) {
    const track = this.dB.tracks[params.id];
    if (!track)
      throw new HttpException(ErrMsg.TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    Object.assign(track, updateTrackDto);
    return track;
  }
  delete(params: FindID) {
    if (!this.dB.tracks[params.id])
      throw new HttpException(ErrMsg.TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    removeIdPrints(dB, params.id);
    delete this.dB.tracks[params.id];
  }
}
