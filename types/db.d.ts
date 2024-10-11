import type { Anime } from "@tutkli/jikan-ts";

export interface DbAnime {
  id: number;
  created_at: string;
  stars: number;
  rewatch_count: number;
  current_episode: number;
  recommended_by: string;
  watched: boolean;
  is_hidden: boolean;
  tags: string;
}

export interface CombinedAnime extends DbAnime {
  data: Anime
}