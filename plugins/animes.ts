import type { Anime } from "~/types/database";

export default defineNuxtPlugin((nuxtApp) => {
  const animes = {
    async anime(id: number): Promise<Anime | null> {
      const { $database, $api } = useNuxtApp();

      const db_anime = await $database.anime(id);

      if (!db_anime) return null;

      try {
        const anime = await $api.anime(id);

        if ("errors" in anime) {
          if (
            (anime.errors as { message: string }[])[0].message == "Not Found."
          ) {
            console.log("anime does not exist");
            return null;
          }
        }

        return {
          ...db_anime,
          data: anime,
        };
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    async animes() {
      const { $database, $api } = useNuxtApp();

      const db_animes = await $database.animes();

      if (db_animes.length == 0) return [];

      const ids: number[] = [];

      db_animes.forEach((a) => ids.push(a.id));

      let animes = await $api.animes(ids);

      const notfound = ids.filter(
        (id) => !animes.map((a) => a.id).includes(id)
      );

      console.log(notfound);
    },
  };

  return {
    provide: {
      animes,
    },
  };
});
