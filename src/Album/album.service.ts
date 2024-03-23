import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrMsg, FindID } from 'src/types';
import { CreateAlbumDto, UpdateAlbumDto } from './Dto/types';
import { Album } from './Album';
import { removeIdPrints } from 'src/utils';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { LoggingService } from 'src/Logger/logger.service';

@Injectable()
export class AlbumService {
  protected prisma = new PrismaClient();

  constructor(private loggingService: LoggingService) {
    this.loggingService.setContext('AppService');
  }

  async getAllAlbums(request: Request) {
    return await this.prisma.album.findMany();
  }

  async getAlbumById(params: FindID) {
    const foundEntity = await this.prisma.album.findUnique({
      where: { id: params.id },
    });
    if (foundEntity === null)
      throw new HttpException(ErrMsg.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    return foundEntity;
  }

  async create(album: CreateAlbumDto) {
    const newEntity = new Album(album);
    return await this.prisma.album.create({
      data: {
        id: newEntity.id,
        name: newEntity.name,
        year: newEntity.year,
        artistId: newEntity.artistId,
      },
    });
  }

  async updateAlbum(params: FindID, updateAlbumDto: UpdateAlbumDto) {
    const foundEntity = await this.prisma.album.findUnique({
      where: { id: params.id },
    });
    if (!foundEntity)
      throw new HttpException(ErrMsg.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    return await this.prisma.album.update({
      where: { id: params.id },
      data: { ...foundEntity, ...updateAlbumDto },
    });
  }

  async delete(params: FindID) {
    try {
      await this.prisma.album.delete({
        where: { id: params.id },
      });
      await removeIdPrints(this.prisma, params.id);
    } catch {
      throw new HttpException(ErrMsg.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
