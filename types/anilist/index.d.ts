import { type AnilistAnime } from "./anime";
export * from "./anime";

export interface AnilistResponse {
  Media: AnilistAnime;
}

export interface PagedAnilistResponse {
  Page: {
    pageInfo: {
      currentPage: number;
      hasNextPage: boolean;
      lastPage: number;
      perPage: number;
      total: number;
    };
    media: AnilistAnime[];
  };
}
