import { PrismaClient } from '@prisma/client';

export const removeIdPrints = async (prisma: PrismaClient, id: string) => {
  await prisma.track.updateMany({
    where: { albumId: id },
    data: { albumId: null },
  });
  await prisma.track.updateMany({
    where: { artistId: id },
    data: { artistId: null },
  });

  await prisma.album.updateMany({
    where: { artistId: id },
    data: { artistId: null },
  });
};
