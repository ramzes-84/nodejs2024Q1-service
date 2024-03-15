import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrMsg, FindID } from 'src/types';
import { CreateTrackDto, UpdateTrackDto } from './Dto/types';
import { Track } from './Track';
import { removeIdPrints } from 'src/utils';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TrackService {
  protected prisma = new PrismaClient();

  async getAllTracks() {
    return await this.prisma.track.findMany();
  }

  async getTrackById(params: FindID) {
    const foundEntity = await this.prisma.track.findUnique({
      where: { id: params.id },
    });
    if (foundEntity === null)
      throw new HttpException(ErrMsg.TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    return foundEntity;
  }

  async create(track: CreateTrackDto) {
    const newEntity = new Track(track);
    return await this.prisma.track.create({
      data: {
        id: newEntity.id,
        name: newEntity.name,
        duration: newEntity.duration,
        albumId: newEntity.albumId,
        artistId: newEntity.artistId,
      },
    });
  }

  async updateTrack(params: FindID, updateTrackDto: UpdateTrackDto) {
    const foundEntity = await this.prisma.track.findUnique({
      where: { id: params.id },
    });
    if (!foundEntity)
      throw new HttpException(ErrMsg.TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    return await this.prisma.track.update({
      where: { id: params.id },
      data: { ...foundEntity, ...updateTrackDto },
    });
  }

  async delete(params: FindID) {
    try {
      await this.prisma.track.delete({
        where: { id: params.id },
      });
      await removeIdPrints(this.prisma, params.id);
    } catch {
      throw new HttpException(ErrMsg.TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
