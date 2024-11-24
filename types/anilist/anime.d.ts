export type FuzzyDate = {
  year?: number;
  month?: number;
  day?: number;
};

export type MediaTitle = {
  romaji?: string | null;
  english?: string | null;
  native?: string | null;
  userPreferred?: string | null;
};

export enum MediaType {
  Anime = "ANIME",
  Manga = "MANGA",
}

export enum MediaFormat {
  Tv = "TV",
  TvShort = "TV_SHORT",
  Movie = "MOVIE",
  Special = "SPECIAL",
  Ova = "OVA",
  Ona = "ONA",
  Music = "MUSIC",
  Manga = "MANGA",
  Novel = "NOVEL",
  OneShot = "ONE_SHOT",
}

export enum MediaStatus {
  Finished = "FINISHED",
  Releasing = "RELEASING",
  NotYetReleased = "NOT_YET_RELEASED",
  Cancelled = "CANCELLED",
  Hiatus = "HIATUS",
}

export enum MediaSeason {
  Winter = "WINTER",
  Spring = "SPRING",
  Summer = "SUMMER",
  Fall = "FALL",
}

export enum MediaSource {
  Original = "ORIGINAL",
  Manga = "MANGA",
  LightNovel = "LIGHT_NOVEL",
  VisualNovel = "VISUAL_NOVEL",
  VideoGame = "VIDEO_GAME",
  Other = "OTHER",
  Novel = "NOVEL",
  Doujinshi = "DOUJINSHI",
  Anime = "ANIME",
  WebNovel = "WEB_NOVEL",
  LiveAction = "LIVE_ACTION",
  Game = "GAME",
  Comic = "COMIC",
  MultimediaProject = "MULTIMEDIA_PROJECT",
  PictureBook = "PICTURE_BOOK",
}

export type MediaTrailer = {
  id?: string | null;
  site?: string | null;
  thumbnail?: string | null;
};

export type MediaCoverImage = {
  extraLarge?: string | null;
  large?: string | null;
  medium?: string | null;
  color?: string | null;
};

export type MediaTag = {
  id: number;
  name: string;
  description?: string | null;
  category?: string | null;
  rank?: number | null;
  isGeneralSpoiler?: boolean | null;
  isMediaSpoiler?: boolean | null;
  isAdult?: boolean | null;
};

export type MediaConnection = {
  edges?: Array<MediaEdge> | null;
  nodes?: Array<Media> | null;
};

export type MediaEdge = {
  node?: Media | null;
  id?: number | null;
  relationType?: MediaRelation | null;
};

export enum MediaRelation {
  Adaptation = "ADAPTATION",
  Prequel = "PREQUEL",
  Sequel = "SEQUEL",
  Parent = "PARENT",
  SideStory = "SIDE_STORY",
  Character = "CHARACTER",
  Summary = "SUMMARY",
  Alternative = "ALTERNATIVE",
  SpinOff = "SPIN_OFF",
  Other = "OTHER",
  Source = "SOURCE",
  Compilation = "COMPILATION",
  Contains = "CONTAINS",
}

export type CharacterConnection = {
  edges?: Array<CharacterEdge> | null;
  nodes?: Array<Character> | null;
};

export type CharacterEdge = {
  node?: Character | null;
  role?: CharacterRole | null;
};

export type Character = {
  id: number;
  name?: CharacterName | null;
  image?: CharacterImage | null;
  age?: string | null;
};

export type CharacterName = {
  first?: string | null;
  middle?: string | null;
  last?: string | null;
  full?: string | null;
  native?: string | null;
};

export type CharacterImage = {
  large?: string | null;
  medium?: string | null;
};

export enum CharacterRole {
  Main = "MAIN",
  Supporting = "SUPPORTING",
  Background = "BACKGROUND",
}

export type StaffConnection = {
  edges?: Array<StaffEdge> | null;
  nodes?: Array<Staff> | null;
};

export type StaffEdge = {
  node?: Staff | null;
  role?: string | null;
};

export type Staff = {
  id: number;
  name?: StaffName | null;
  image?: StaffImage | null;
};

export type StaffName = {
  first?: string | null;
  middle?: string | null;
  last?: string | null;
  full?: string | null;
  native?: string | null;
};

export type StaffImage = {
  large?: string | null;
  medium?: string | null;
};

export type StudioConnection = {
  edges?: Array<StudioEdge> | null;
  nodes?: Array<Studio> | null;
};

export type StudioEdge = {
  node?: Studio | null;
  isMain: boolean;
};

export type Studio = {
  id: number;
  name: string;
};

export type AiringSchedule = {
  id: number;
  airingAt: number;
  timeUntilAiring: number;
  episode: number;
};

export type AiringScheduleConnection = {
  edges?: Array<AiringScheduleEdge> | null;
  nodes?: Array<AiringSchedule> | null;
};

export type AiringScheduleEdge = {
  node?: AiringSchedule | null;
};

export type MediaTrendConnection = {
  edges?: Array<MediaTrendEdge> | null;
  nodes?: Array<MediaTrend> | null;
};

export type MediaTrendEdge = {
  node?: MediaTrend | null;
};

export type MediaTrend = {
  mediaId: number;
  date: number;
  trending: number;
  averageScore?: number | null;
  popularity?: number | null;
  episode?: number | null;
};

export enum ExternalLinkType {
  INFO,
  STREAMING,
  SOCIAL,
}

export type MediaExternalLink = {
  id: number;
  url?: string | null;
  site?: string;
  type?: ExternalLinkType | null;
  color?: string | null;
  icon?: string | null;
};

export type MediaStreamingEpisode = {
  title?: string | null;
  thumbnail?: string | null;
  url?: string | null;
  site?: string | null;
};

export type MediaRank = {
  id: number;
  rank: number;
  type: MediaRankType;
  context: string;
};

export enum MediaRankType {
  Rated = "RATED",
  Popular = "POPULAR",
}

export type MediaList = {
  id: number;
  userId: number;
  mediaId: number;
  status?: MediaListStatus | null;
  score?: number | null;
  progress?: number | null;
};

export enum MediaListStatus {
  Current = "CURRENT",
  Planning = "PLANNING",
  Completed = "COMPLETED",
  Dropped = "DROPPED",
  Paused = "PAUSED",
  Repeating = "REPEATING",
}

export type ReviewConnection = {
  edges?: Array<ReviewEdge> | null;
  nodes?: Array<Review> | null;
};

export type ReviewEdge = {
  node?: Review | null;
};

export type Review = {
  id: number;
  userId: number;
  mediaId: number;
  body?: string | null;
  score?: number | null;
};

export type RecommendationConnection = {
  edges?: Array<RecommendationEdge> | null;
  nodes?: Array<Recommendation> | null;
};

export type RecommendationEdge = {
  node?: Recommendation | null;
};

export type Recommendation = {
  id: number;
  mediaId: number;
  mediaRecommendationId?: number | null;
};

export type MediaStats = {
  scoreDistribution?: Array<ScoreDistribution> | null;
  statusDistribution?: Array<StatusDistribution> | null;
};

export type ScoreDistribution = {
  score?: number | null;
  amount?: number | null;
};

export type StatusDistribution = {
  status?: MediaListStatus | null;
  amount?: number | null;
};

export type Media = {
  id: number;
  idMal?: number | null;
  title?: MediaTitle | null;
  type?: MediaType | null;
  format?: MediaFormat | null;
  status?: MediaStatus | null;
  description?: string | null;
  startDate?: FuzzyDate | null;
  endDate?: FuzzyDate | null;
  season?: MediaSeason | null;
  seasonYear?: number | null;
  episodes?: number | null;
  duration?: number | null;
  chapters?: number | null;
  volumes?: number | null;
  countryOfOrigin?: any | null;
  isLicensed?: boolean | null;
  source?: MediaSource | null;
  trailer?: MediaTrailer | null;
  coverImage?: MediaCoverImage | null;
  bannerImage?: string | null;
  genres?: Array<string> | null;
  synonyms?: Array<string> | null;
  averageScore?: number | null;
  popularity?: number | null;
  tags?: Array<MediaTag> | null;
  relations?: MediaConnection | null;
  characters?: CharacterConnection | null;
  staff?: StaffConnection | null;
  studios?: StudioConnection | null;
  isFavourite: boolean;
  isAdult?: boolean | null;
  nextAiringEpisode?: AiringSchedule | null;
  airingSchedule?: AiringScheduleConnection | null;
  trends?: MediaTrendConnection | null;
  externalLinks?: Array<MediaExternalLink> | null;
  streamingEpisodes?: Array<MediaStreamingEpisode> | null;
  rankings?: Array<MediaRank> | null;
  mediaListEntry?: MediaList | null;
  reviews?: ReviewConnection | null;
  recommendations?: RecommendationConnection | null;
  stats?: MediaStats | null;
};

export type AnilistAnime = {
  id: number;
  idMal: number | null;
  title: {
    romaji: string | null;
    english: string | null;
  };
  status: MediaStatus | null;
  description: string | null;
  season: MediaSeason | null;
  seasonYear: number | null;
  episodes: number | null;
  coverImage: {
    url: string | null;
    color: string | null;
  };
  bannerImage: string | null;
  genres: Array<string>;
  averageScore: number | null;
  meanScore: number | null;
  favourites: number | null;
  popularity: number | null;
  characters: {
    nodes: Array<{
      id: number;
      name: {
        full: string | null;
      };
      age: string | null;
      image: {
        url: string | null;
      };
    }>;
  };
  isAdult: boolean | null;
  externalLinks: Array<{
    id: number;
    url: string | null;
    site: string;
    type: ExternalLinkType | null;
    color: string | null;
    icon: string | null;
  }>;
};

export type AnilistAnimeID = {
  id: number;
  idMal: number;
};

export type MinimalAnilistAnime = {
  id: number;
  title: {
    romaji: string | null;
    english: string | null;
  };
  description: string | null;
  season: MediaSeason | null;
  seasonYear: number | null;
  coverImage: {
    url: string | null;
    color: string | null;
  };
  averageScore: number | null;
  favourites: number | null;
  popularity: number | null;
};
