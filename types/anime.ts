export interface AnimeQueryResponse {
  Media: MediaDetails;
}

export interface MediaDetails {
  bannerImage: string | null;
  coverImage: CoverImage;
  title: MediaTitle;
  externalLinks: ExternalLink[];
  isFavourite: boolean;
  isAdult: boolean;
  genres: string[];
  tags: MediaTag[];
  status: MediaStatus;
  season: MediaSeason | null;
  seasonYear: number | null;
  recommendations: MediaRecommendationConnection;
  popularity: number;
  favourites: number;
  description: string | null;
  averageScore: number | null;
  characters: CharacterConnection;
  mediaListEntry: MediaListEntry | null;
}

export interface MediaListEntry {
  private: boolean;
  score: number;
}

export interface CoverImage {
  extraLarge: string;
  color: string | null;
}

export interface MediaTitle {
  userPreferred: string;
}

export interface ExternalLink {
  color: string | null;
  icon: string | null;
  site: string;
  url: string;
}

export interface MediaTag {
  name: string;
}

export interface MediaRecommendationConnection {
  nodes: MediaRecommendation[];
}

export interface MediaRecommendation {
  media: RecommendationMedia;
}

export interface RecommendationMedia {
  id: number;
  title: {
    userPreferred: string;
  };
  coverImage: {
    extraLarge: string;
  };
}

export interface CharacterConnection {
  nodes: Character[];
}

export interface Character {
  image: {
    large: string;
  };
  name: {
    userPreferred: string;
  };
}

export type MediaStatus =
  | "FINISHED"
  | "RELEASING"
  | "NOT_YET_RELEASED"
  | "CANCELLED"
  | "HIATUS"
  | string;

export type MediaSeason = "WINTER" | "SPRING" | "SUMMER" | "FALL";
