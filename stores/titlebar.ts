export const useTitlebarStore = defineStore("titlebarStore", {
  state: () => ({
    title: "",
    search: "",
    count: 0,
    background: "",
  }),
  actions: {
    getTitle() {
      return this.title;
    },
    setTitle(title: string) {
      this.title = title;
    },
    getSearch() {
      return this.search;
    },
    setSearch(search: string) {
      this.search = search;
    },
  },
});
