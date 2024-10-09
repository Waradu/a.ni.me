import type { SettingsStore } from "~/types/types";

export const useSettingsStore = defineStore("settingsStore", {
  state: (): SettingsStore => ({
    showNSFW: false,
    tvOnly: true,
    sortBy: "year",
    filters: {
      watched: null,
      stars: null,
    },
  }),

  actions: {},
});
