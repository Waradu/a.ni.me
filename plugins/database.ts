import Database from "@tauri-apps/plugin-sql";
import type { Anime } from "~/types/anime";
import type { DbAnime, DbCharacter, DbGenre, DbAnimeGenre } from "~/types/db";
import type { Data as JikanData } from "~/types/response";

export default defineNuxtPlugin(async (nuxtApp) => {
  //@ts-ignore
  if (nuxtApp.$router.currentRoute.value.path === "/confetti") {
    return {};
  }

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
    async anime(id: number): Promise<Anime | null> {
      const animeResult = await db.select<DbAnime[]>(
        "SELECT * FROM animes WHERE id = ?",
        [id]
      );

      const anime = animeResult[0];

      if (!anime) {
        return null;
      }

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
    },
    async add(anime: JikanData) {
      const animes = await this.animes();
      const id = animes[animes.length - 1].id + 1;
      const title = anime.title.replaceAll('"', "").replaceAll("'", "''");
      try {
        const image = Object.keys(anime.images).reduce((acc, key) => {
          return (
            anime.images[key].large_image_url ||
            acc ||
            anime.images[key].image_url
          );
        }, "");
        const query = `
          INSERT INTO animes (id, created_at, name, url, image, trailer, approved, episodes, airing, status, rating, popularity, score, scored_by, favorites, synopsis, year, stars, watched)
          VALUES 
          (${id}, CURRENT_TIMESTAMP, '${title}', '${anime.url}', '${image}', '${
          anime.trailer.url
        }', ${anime.approved}, ${anime.episodes}, ${anime.airing}, '${
          anime.status
        }', '${anime.rating}', ${anime.popularity}, ${anime.score}, ${
          anime.scored_by
        }, ${anime.favorites}, '${anime.synopsis?.replaceAll("'", "''")}', ${
          anime.year
        }, 0, false)
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
