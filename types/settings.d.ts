export type FilterType = "e" | "ne" | "gt" | "st";
export type FilterValue<T> = T | null;

export interface Filter<T> {
  value: FilterValue<T>;
  type: FilterType;
}

export interface Filters {
  watched: FilterValue<boolean>;
  stars: Filter<number>;
  showHidden: boolean;
}

export type SortBy =
  | "year"
  | "name"
  | "score"
  | "favorites"
  | "stars"
  | "date_added";

export type Order = "asc" | "desc";

export interface SettingsStore {
  finishedIntroduction: boolean;
  showNSFW: boolean;
  tvAndMovieOnly: boolean;
  sortBy: SortBy;
  order: Order;
  filters: Filters;
  imageProxy: string;
}
