import Database from "@tauri-apps/plugin-sql";
import { AnimeClient, type Anime } from "@tutkli/jikan-ts";
import type { CombinedAnime, DbAnime } from "~/types/db";

export default defineNuxtPlugin(async (nuxtApp) => {
  //@ts-ignore
  if (nuxtApp.$router.currentRoute.value.path === "/confetti") {
    return {};
  }

  let db: Database;

  if (import.meta.client) {
    db = await Database.load("sqlite:a.ni.me.db");
  }

  const animeClient = new AnimeClient();

  const database = {
    async animes(): Promise<CombinedAnime[]> {
      try {
        const animes = await db.select<DbAnime[]>("select * from animes");

        if (!animes) return [];

        return await Promise.all(
          animes.map(async (anime) => {
            const data = (await animeClient.getAnimeById(anime.id)).data;
            return {
              ...anime,
              data: data,
            };
          })
        );
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    async animesPlain() {
      try {
        const animes = await db.select<DbAnime[]>("select * from animes");

        if (!animes) return [];

        return animes;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    async anime(id: number): Promise<CombinedAnime | null> {
      try {
        const animes = await db.select<DbAnime[]>(
          `select * from animes where id = ${id}`
        );

        const response = await animeClient.getAnimeById(id);

        if (!response.data) return null;

        return {
          ...animes[0],
          data: response.data,
        };
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    async add(id: number) {
      try {
        const query = `
          INSERT INTO animes (id)
          VALUES 
          (${id})
        `;
        await db.execute(query);
      } catch (e) {
        console.log(e);
      }
    },
    async stars(id: number, stars: number) {
      await db.execute(`update animes set stars = ${stars} where id = ${id}`);
    },
    async delete(id: number) {
      await db.execute(`delete from animes where id = ${id}`);
    },
  };

  return {
    provide: {
      database,
    },
  };
});
