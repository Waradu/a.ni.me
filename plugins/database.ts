import Database from "@tauri-apps/plugin-sql";
import type { DbAnime } from "~/types/database";

export default defineNuxtPlugin(async (nuxtApp) => {
  let db: Database;

  if (import.meta.client) {
    db = await Database.load("sqlite:a.ni.me.db");
  }

  const database = {
    async count() {
      const animes = await db.select<DbAnime[]>("select * from animes");

      if (!animes) return 0;

      return animes.length;
    },
    async animes() {
      try {
        const animes = await db.select<DbAnime[]>("select * from animes");

        if (!animes) return [];

        return animes;
      } catch (e) {
        console.error(e);
        return [];
      }
    },
    async anime(id: number): Promise<DbAnime | null> {
      try {
        const anime = await db.select<DbAnime[]>(
          `select * from animes where id = ${id}`
        );

        if (!anime[0]) return null;

        return anime[0];
      } catch (e) {
        console.error(e);
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
        console.error(e);
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
        console.error(e);
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
        console.error(e);
      }
    },
  };

  return {
    provide: {
      database,
    },
  };
});
