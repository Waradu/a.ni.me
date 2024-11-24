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
            await $database.delete(id);
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

      const dbAnimes = await $database.animes();

      if (dbAnimes.length == 0) return [];

      const ids: number[] = [];

      dbAnimes.forEach((a) => ids.push(a.id));

      let anilistAnimes = await $api.animes(ids);

      const animes: Anime[] = [];

      dbAnimes.forEach((dba) => {
        const anime = anilistAnimes.find((a) => dba.id == a.id);

        if (!anime) return;

        animes.push({
          ...dba,
          data: anime,
        });
      });

      return animes;
    },
  };

  return {
    provide: {
      animes,
    },
  };
});
