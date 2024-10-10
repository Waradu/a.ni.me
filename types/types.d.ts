export type ItemType = string | number | boolean | null;

export interface Item {
  name: string;
  value: ItemType;
}

export type FilterType = "e" | "ne" | "gt" | "st";
export type FilterValue<T> = T | null;

export interface Filter<T> {
  value: FilterValue<T>;
  type: FilterType;
}

export interface Filters {
  watched: FilterValue<boolean>;
  stars: Filter<number>;
}

export type SortBy =
  | "year"
  | "name"
  | "score"
  | "favorites"
  | "episodes"
  | "stars";

export type Order = "asc" | "desc";

export interface SettingsStore {
  showNSFW: boolean;
  tvOnly: boolean;
  sortBy: SortBy;
  order: Order;
  filters: Filters;
}
