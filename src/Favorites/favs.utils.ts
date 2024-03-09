import { DataBase } from 'src/database/types';
import { FavoritesResponse } from './types';

export const getFavsEntities = (dB: DataBase): FavoritesResponse => {
  const response: FavoritesResponse = { albums: [], artists: [], tracks: [] };
  dB.favs.albums.forEach((id) => response.albums.push(dB.albums[id]));
  dB.favs.artists.forEach((id) => response.artists.push(dB.artists[id]));
  dB.favs.tracks.forEach((id) => response.tracks.push(dB.tracks[id]));
  return response;
};
