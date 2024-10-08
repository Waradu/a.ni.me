import type { SettingsStore } from "~/types/types";

export const useSettingsStore = defineStore("settingsStore", {
  state: (): SettingsStore => ({
    showNSFW: false,
    tvAndMovieOnly: true,
    sortBy: "year",
    order: "asc",
    filters: {
      watched: null,
      stars: {
        value: null,
        type: "e",
      },
    },
  }),

  actions: {},
});
