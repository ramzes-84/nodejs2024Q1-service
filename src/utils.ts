import { DataBase } from './database/types';

export const removeIdPrints = (dB: DataBase, id: string) => {
  for (const item in dB.favs) {
    if (dB.favs[item] instanceof Set) {
      dB.favs[item].delete(id);
    }
  }
  Object.values(dB.tracks).forEach((track) => {
    if (track.albumId === id) track.albumId = null;
    if (track.artistId === id) track.artistId = null;
  });
  Object.values(dB.albums).forEach((album) => {
    if (album.artistId === id) album.artistId = null;
  });
};
