export const useSearchStore = defineStore("searchStore", () => {
  const query = ref("");

  return { query };
});