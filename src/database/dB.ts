import { DataBase } from './types';

export const dB: DataBase = {
  users: {},
  artists: {},
  albums: {},
  tracks: {},
  favs: {
    albums: new Set(),
    artists: new Set(),
    tracks: new Set(),
  },
};
