export const useTitlebarStore = defineStore("titlebarStore", {
  state: () => ({
    title: "",
    backLink: "",
    search: ""
  }),

  actions: {
    getTitle() {
      return this.title;
    },
    setTitle(title: string) {
      this.title = title;
    },
    getBackLink() {
      return this.backLink;
    },
    setBackLink(backLink: string) {
      this.backLink = backLink;
    },
    getSearch() {
      return this.search;
    },
    setSearch(search: string) {
      this.search = search;
    },
  },
  persist: true
});
