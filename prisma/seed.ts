import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const seedBase = async () => {
  await prisma.favorites.create({});
  await prisma.user.create({
    data: {
      id: '0a35dd62-e09f-444b-a628-f4e7c6954f50',
      login: 'Tester',
      password: '12345',
      version: 1,
    },
  });
  await prisma.artist.create({
    data: {
      name: 'Singer',
      id: '0a35dd62-e09f-444b-a628-f4e7c6954f51',
      grammy: true,
    },
  });
  await prisma.album.create({
    data: {
      id: '0a35dd62-e09f-444b-a628-f4e7c6954f52',
      name: 'Album',
      year: 2000,
      artistId: '0a35dd62-e09f-444b-a628-f4e7c6954f51',
    },
  });
  await prisma.track.create({
    data: {
      id: '0a35dd62-e09f-444b-a628-f4e7c6954f53',
      duration: 123,
      name: 'Track',
      artistId: '0a35dd62-e09f-444b-a628-f4e7c6954f51',
      albumId: '0a35dd62-e09f-444b-a628-f4e7c6954f52',
    },
  });
  await prisma.$disconnect();
};

seedBase();
