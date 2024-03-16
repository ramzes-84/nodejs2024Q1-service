// import { DefaultArgs } from '@prisma/client/runtime/library';
// import { FavoritesResponse } from './types';
// import { Prisma, PrismaClient } from '@prisma/client';

// export const getFavsEntities = async (
//   prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
// ) => {
//   const foundData = await prisma.favorites.findMany({
//     include: { albums: true, artists: true, tracks: true },
//   });
// const response: FavoritesResponse = { albums: [], artists: [], tracks: [] };
// dB.favs.albums.forEach((id) => response.albums.push(dB.albums[id]));
// dB.favs.artists.forEach((id) => response.artists.push(dB.artists[id]));
// dB.favs.tracks.forEach((id) => response.tracks.push(dB.tracks[id]));
// return foundData;
// };
