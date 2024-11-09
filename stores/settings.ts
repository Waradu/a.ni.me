import type { SettingsStore } from "~/types/types";

export const useSettingsStore = defineStore("settingsStore", {
  state: (): SettingsStore => ({
    finishedIntroduction: false,
    showNSFW: false,
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
    malImageProxy: "",
    jikanBaseUrl: "",
  }),
});
