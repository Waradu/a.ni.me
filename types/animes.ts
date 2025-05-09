export interface GetUserAnimeCollection {
  MediaListCollection: MediaListCollection;
}

export interface MediaListCollection {
  lists: MediaList[];
}

export interface MediaList {
  entries: MediaListEntry[];
  isCustomList: boolean;
}

export interface MediaListEntry {
  media: Media;
}

export interface Media {
  title: MediaTitle;
  coverImage: MediaCoverImage;
  format: MediaFormat;
  id: number;
  isFavourite: boolean;
  season: MediaSeason | null;
  seasonYear: number | null;
}

export interface MediaTitle {
  userPreferred: string;
}

export interface MediaCoverImage {
  large: string;
}

export type MediaFormat =
  | "TV"
  | "TV_SHORT"
  | "MOVIE"
  | "SPECIAL"
  | "OVA"
  | "ONA"
  | "MUSIC"
  | "MANGA"
  | "NOVEL"
  | "ONE_SHOT"
  | string;

export type MediaSeason = "WINTER" | "SPRING" | "SUMMER" | "FALL";
