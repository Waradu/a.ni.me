import type { SettingsStore } from "~/types/settings";

export const useSettingsStore = defineStore("settingsStore", {
  state: (): SettingsStore => ({
    finishedIntroduction: false,
    showNSFW: false,
    reducedAnimations: false,
    tvAndMovieOnly: true,
    sortBy: "date_added",
    order: "asc",
    filters: {
      watched: null,
      stars: {
        value: null,
        type: "e",
      },
      showHidden: false,
    },
    imageProxy: "",
  }),
});
