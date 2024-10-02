import type { Anime } from "@tutkli/jikan-ts";

export interface DbAnime {
  id: number;
  created_at: string;
  stars: number;
  rewatch_count: number;
  recommended_by: string;
  watched: boolean;
}

export interface CombinedAnime extends DbAnime {
  data: Anime
}