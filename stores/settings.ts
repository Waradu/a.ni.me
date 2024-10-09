import type { SettingsStore } from "~/types/types";

export const useSettingsStore = defineStore("settingsStore", {
  state: (): SettingsStore => ({
    showNSFW: false,
    tvOnly: true,
    sortBy: "year",
    order: "asc",
    filters: {
      watched: null,
      stars: null,
    },
  }),

  actions: {},
});
