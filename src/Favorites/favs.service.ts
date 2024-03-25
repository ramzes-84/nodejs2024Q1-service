import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ErrMsg, FindID } from 'src/types';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FavoriteService {
  protected prisma = new PrismaClient();

  async getAllFavs() {
    await this.prisma.favorites.create({});
    return await this.prisma.favorites.findFirst({
      include: {
        albums: {
          select: { artistId: true, id: true, name: true, year: true },
        },
        artists: { select: { grammy: true, id: true, name: true } },
        tracks: {
          select: {
            albumId: true,
            artistId: true,
            duration: true,
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async addTrack(params: FindID) {
    const foundEntity = await this.prisma.track.findUnique({
      where: { id: params.id },
    });
    if (!foundEntity)
      throw new UnprocessableEntityException(ErrMsg.TRACK_NOT_FOUND);
    await this.prisma.favorites.update({
      where: {
        id: 1,
      },
      data: {
        tracks: {
          connect: {
            id: params.id,
          },
        },
      },
    });
  }

  async addArtist(params: FindID) {
    const foundEntity = await this.prisma.artist.findUnique({
      where: { id: params.id },
    });
    if (!foundEntity)
      throw new UnprocessableEntityException(ErrMsg.ARTIST_NOT_FOUND);
    await this.prisma.favorites.update({
      where: {
        id: 1,
      },
      data: {
        artists: {
          connect: {
            id: params.id,
          },
        },
      },
    });
  }

  async addAlbum(params: FindID) {
    const foundEntity = await this.prisma.album.findUnique({
      where: { id: params.id },
    });
    if (!foundEntity)
      throw new UnprocessableEntityException(ErrMsg.ALBUM_NOT_FOUND);
    await this.prisma.favorites.update({
      where: {
        id: 1,
      },
      data: {
        albums: {
          connect: {
            id: params.id,
          },
        },
      },
    });
  }

  async deleteTrack(params: FindID) {
    const foundEntity = await this.prisma.track.findUnique({
      where: { id: params.id },
    });
    if (!foundEntity) throw new NotFoundException(ErrMsg.TRACK_NOT_FOUND);
    await this.prisma.favorites.update({
      where: {
        id: 1,
      },
      data: {
        tracks: {
          disconnect: {
            id: params.id,
          },
        },
      },
    });
  }

  async deleteArtist(params: FindID) {
    const foundEntity = await this.prisma.artist.findUnique({
      where: { id: params.id },
    });
    if (!foundEntity) throw new NotFoundException(ErrMsg.ARTIST_NOT_FOUND);
    await this.prisma.favorites.update({
      where: {
        id: 1,
      },
      data: {
        artists: {
          disconnect: {
            id: params.id,
          },
        },
      },
    });
  }

  async deleteAlbum(params: FindID) {
    const foundEntity = await this.prisma.album.findUnique({
      where: { id: params.id },
    });
    if (!foundEntity) throw new NotFoundException(ErrMsg.ALBUM_NOT_FOUND, D);
    await this.prisma.favorites.update({
      where: {
        id: 1,
      },
      data: {
        albums: {
          disconnect: {
            id: params.id,
          },
        },
      },
    });
  }
}
