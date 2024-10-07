export const useSetupStore = defineStore("setupStore", {
  state: () => ({
    inSetup: false,
    showNSFW: false,
    tvOnly: true,
    selectedAnimes: [],
    finished: false
  }),

  actions: {},
  persist: true
});
