export interface Item {
  name: string;
  value: string;
}

export interface Filters {
  watched: boolean | null;
  stars: number | null;
}

export type SortBy =
  | "year"
  | "name"
  | "score"
  | "favorites"
  | "episodes"
  | "stars";

export interface SettingsStore {
  showNSFW: boolean;
  tvOnly: boolean;
  sortBy: SortBy;
  filters: Filters;
}