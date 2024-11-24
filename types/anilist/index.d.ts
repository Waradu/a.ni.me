import { type AnilistAnime } from "./anime";
export * from "./anime";

export interface AnilistResponse<T> {
  Media: T;
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
