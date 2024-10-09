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

export type Order = "asc" | "desc"

export interface SettingsStore {
  showNSFW: boolean;
  tvOnly: boolean;
  sortBy: SortBy;
  order: Order;
  filters: Filters;
}