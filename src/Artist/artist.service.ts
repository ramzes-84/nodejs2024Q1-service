import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrMsg, FindID } from 'src/types';
import { CreateArtistDto, UpdateArtistDto } from './Dto/types';
import { Artist } from './Artist';
import { removeIdPrints } from 'src/utils';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ArtistService {
  protected prisma = new PrismaClient();

  async getAllArtists() {
    return await this.prisma.artist.findMany();
  }

  async getArtistById(params: FindID) {
    const foundEntity = await this.prisma.artist.findUnique({
      where: { id: params.id },
    });
    if (foundEntity === null)
      throw new NotFoundException(ErrMsg.ARTIST_NOT_FOUND);
    return foundEntity;
  }

  async create(artist: CreateArtistDto) {
    const newEntity = new Artist(artist);
    return await this.prisma.artist.create({
      data: {
        id: newEntity.id,
        name: newEntity.name,
        grammy: newEntity.grammy,
      },
    });
  }

  async updateArtist(params: FindID, updateArtistDto: UpdateArtistDto) {
    const foundEntity = await this.prisma.artist.findUnique({
      where: { id: params.id },
    });
    if (!foundEntity) throw new NotFoundException(ErrMsg.ARTIST_NOT_FOUND);
    return await this.prisma.artist.update({
      where: { id: params.id },
      data: { ...foundEntity, ...updateArtistDto },
    });
  }

  async delete(params: FindID) {
    try {
      await this.prisma.artist.delete({
        where: { id: params.id },
      });
      await removeIdPrints(this.prisma, params.id);
    } catch {
      throw new NotFoundException(ErrMsg.ARTIST_NOT_FOUND);
    }
  }
}
