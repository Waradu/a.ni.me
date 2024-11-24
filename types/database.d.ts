import type { MinimalAnilistAnime } from "~/types/anilist";

export interface DbAnime {
  id: number;
  created_at: string;
  stars: number;
  rewatch_count: number;
  recommended_by: string;
  watched: boolean;
  is_hidden: boolean;
  tags: string;
  migrated: boolean;
}

export interface Anime extends DbAnime {
  data: MinimalAnilistAnime;
}
