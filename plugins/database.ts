import Database from "@tauri-apps/plugin-sql";
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

  const { $cache } = useNuxtApp();

  const database = {
    async animes(cachedOnly: boolean = false): Promise<CombinedAnime[]> {
      try {
        const animes = await db.select<DbAnime[]>("select * from animes");

        if (!animes) return [];

        return await Promise.all(
          animes.map(async (anime) => {
            const data = await $cache.get(anime.id, { cachedOnly: cachedOnly });

            if (data === null) {
              return null;
            }

            return {
              ...anime,
              data: data,
            };
          })
        ).then((results) => results.filter((anime) => anime !== null));
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    async count() {
      const animes = await db.select<DbAnime[]>("select * from animes");

      if (!animes) return 0;

      return animes.length;
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

        const anime = await $cache.get(id);

        if (!anime) return null;

        return {
          ...animes[0],
          data: anime,
        };
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    async add(id: number | string) {
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
    async addWithData(anime: {
      id: number | string;
      created_at: string;
      stars: number;
      rewatch_count: number;
      recommended_by: string;
      watched: boolean;
      is_hidden: boolean;
      tags: string;
    }) {
      try {
        const query = `
          INSERT INTO animes (id, created_at, stars, rewatch_count, recommended_by, watched)
          VALUES 
          (${anime.id}, '${anime.created_at}', ${anime.stars}, ${anime.rewatch_count}, '${anime.recommended_by}', ${anime.watched})
          ON CONFLICT (id) DO UPDATE SET
            created_at = EXCLUDED.created_at,
            stars = EXCLUDED.stars,
            rewatch_count = EXCLUDED.rewatch_count,
            recommended_by = EXCLUDED.recommended_by,
            watched = EXCLUDED.watched;
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
    async deleteAll() {
      await db.execute(`delete from animes`);
    },
    async hidden(id: number, hidden: boolean) {
      try {
        await db.execute(
          `update animes set is_hidden = ${hidden} where id = ${id}`
        );
      } catch (e) {
        console.log(e);
      }
    },
  };

  return {
    provide: {
      database,
    },
  };
});
