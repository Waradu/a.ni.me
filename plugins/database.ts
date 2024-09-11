import Database from "@tauri-apps/plugin-sql";
import type { Anime } from "~/types/anime";
import type { DbAnime, DbCharacter, DbGenre, DbAnimeGenre } from "~/types/db";

export default defineNuxtPlugin(async (nuxtApp) => {
  let db: Database;

  if (import.meta.client) {
    db = await Database.load("sqlite:anilist.db");
  }

  const database = {
    async animes(): Promise<Anime[]> {
      const animes = await db.select<DbAnime[]>("select * from animes");

      return await Promise.all(
        animes.map(async (anime) => {
          const characters = await db.select<DbCharacter[]>(
            "SELECT * FROM characters WHERE anime_id = ?",
            [anime.id]
          );

          const genreIds = await db.select<DbAnimeGenre[]>(
            "SELECT * FROM anime_genre WHERE anime_id = ?",
            [anime.id]
          );

          const genres = await db.select<DbGenre[]>(
            `SELECT * FROM genres WHERE id IN (${genreIds
              .map((g) => g.genre_id)
              .join(",")})`
          );

          return {
            ...anime,
            characters,
            genres,
          };
        })
      );
    },
  };

  return {
    provide: {
      database,
    },
  };
});
