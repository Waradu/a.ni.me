export const useTitlebarStore = defineStore("titlebarStore", {
  state: () => ({
    title: "",
    backLink: ""
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
  },
  persist: true
});
