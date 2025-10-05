import { MediaListSort } from "~/gql/gen/types.generated";
import type { MediaListStatus } from "~/types/animes";

export const useFiltersStore = defineStore("filtersStore", () => {
  const sort = ref<MediaListSort>(MediaListSort.AddedTime);
  const desc = ref<boolean>(false);
  const status = ref<MediaListStatus | null>(null);

  return { sort, status, desc };
}, {
  persist: {
    storage: localStorage,
    pick: ["sort", "status", "desc"]
  }
});