import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const removeIdPrints = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  id: string,
) => {
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
