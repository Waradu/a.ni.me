import { MediaListSort, type MediaListStatus } from "~/gql/gen/types.generated";

export const useFiltersStore = defineStore("filtersStore", () => {
  const sort = ref<MediaListSort>(MediaListSort.AddedTime);
  const desc = ref<boolean>(false);
  const singleCompletedList = ref<boolean>(false);
  const status = ref<MediaListStatus>();

  return { sort, status, desc, singleCompletedList };
}, {
  persist: {
    storage: localStorage,
    pick: ["sort", "status", "desc"]
  }
});