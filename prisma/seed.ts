import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const seedBase = async () => {
  await prisma.favorites.create({});
  await prisma.$disconnect();
};

seedBase();
