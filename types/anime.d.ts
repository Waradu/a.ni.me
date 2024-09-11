import type { DbAnime, DbGenre, DbCharacter } from "~/types/db";

export type Anime = {
  id: number;
  created_at: string;
  name: string;
  url: string;
  image: string;
  trailer: string;
  approved: boolean;
  episodes: number;
  airing: boolean;
  status: string;
  rating: string;
  popularity: number;
  score: number;
  scored_by: number;
  favorites: number;
  synopsis: string;
  year: number;
  stars: number;
  watched: boolean;
  characters: DbCharacter[];
  genres: DbGenre[];
};

export type Character = {
  id: number;
  created_at: string;
  name: string;
  image: string;
  anime: DbAnime[];
};

export type Genre = {
  id: number;
  created_at: string;
  name: string;
  animes: DbAnime[];
};