import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
// import { DataBase } from './database/types';

export const removeIdPrints = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  id: string,
) => {
  // for (const item in dB.favs) {
  //   if (dB.favs[item] instanceof Set) {
  //     dB.favs[item].delete(id);
  //   }
  // }
  await prisma.track.updateMany({
    where: { albumId: id },
    data: { albumId: null },
  });
  await prisma.track.updateMany({
    where: { artistId: id },
    data: { artistId: null },
  });

  // Object.values(dB.tracks).forEach((track) => {
  //   if (track.albumId === id) track.albumId = null;
  //   if (track.artistId === id) track.artistId = null;
  // });

  await prisma.album.updateMany({
    where: { artistId: id },
    data: { artistId: null },
  });

  // Object.values(dB.albums).forEach((album) => {
  //   if (album.artistId === id) album.artistId = null;
  // });
};
