export type DbAnime = {
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
};

export type DbCharacter = {
  id: number;
  created_at: string;
  name: string;
  image: string;
  anime_id: number;
};

export type DbGenre = {
  id: number;
  created_at: string;
  name: string;
};

export type DbAnimeGenre = {
  id: number;
  created_at: string;
  anime_id: number;
  genre_id: number;
};
