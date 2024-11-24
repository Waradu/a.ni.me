export const useSetupStore = defineStore("setupStore", {
  state: () => ({
    inSetup: false,
    showNSFW: false,
    tvAndMovieOnly: true,
    selectedAnimes: [],
    finished: false,
  }),
  actions: {},
  persist: true,
});
