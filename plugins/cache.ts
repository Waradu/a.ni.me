import {
  BaseDirectory,
  exists,
  mkdir,
  readTextFile,
  remove,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import { AnimeClient, type Anime } from "@tutkli/jikan-ts";
import type { CacheOptions } from "~/types/types";
import { animeSchema } from "~/types/yup";

export default defineNuxtPlugin(async (nuxtApp) => {
  await base();
  const animeClient = new AnimeClient();

  const cache = {
    async get(id: number, options?: CacheOptions): Promise<Anime | null> {
      try {
        const animeExists = await cacheExists(id);

        if (animeExists && !(options && options.invalidate)) {
          const data = await readCache(id);
          if (data) {
            return data;
          }
        }

        if (options && options.cachedOnly) return null;

        const anime = await getAnimeWithRetry(id);

        await writeCache(id, anime.data);

        return anime.data;
      } catch (e) {
        console.log(e);

        try {
          const anime = await animeClient.getAnimeById(id);
          return anime.data;
        } catch (e) {
          console.log(e);
          return null;
        }
      }
    },
  };

  async function base() {
    const appdataDir = await exists("", { baseDir: BaseDirectory.AppData });

    if (!appdataDir) {
      await mkdir("", {
        baseDir: BaseDirectory.AppData,
      });
    }

    const cacheDir = await exists("cache", {
      baseDir: BaseDirectory.AppData,
    });

    if (!cacheDir) {
      await mkdir("cache", {
        baseDir: BaseDirectory.AppData,
      });
    }

    await writeTextFile(`cache/.do_not_edit`, "", {
      baseDir: BaseDirectory.AppData,
    });
  }

  async function cacheExists(id: number): Promise<boolean> {
    return await exists(`cache/${id}.json`, { baseDir: BaseDirectory.AppData });
  }

  async function readCache(id: number): Promise<Anime | null> {
    try {
      const animeData = await readTextFile(`cache/${id}.json`, {
        baseDir: BaseDirectory.AppData,
      });
      const parsed = JSON.parse(animeData);

      await animeSchema.validate(parsed.data, { abortEarly: false });

      return parsed.data as Anime;
    } catch (error: unknown) {
      if (error instanceof Error) {
        if ((error as any).code === "FileNotFound") {
          return null;
        } else if (error.name === "ValidationError") {
          console.log(
            `Validation error for cache ID ${id}:`,
            (error as any).errors
          );
          await deleteCache(id);
          return null;
        } else {
          console.error(`Error reading cache for ID ${id}:`, error);
          throw error;
        }
      }
      throw new Error("An unknown error occurred.");
    }
  }

  async function deleteCache(id: number) {
    const anime = await remove(`cache/${id}.json`, {
      baseDir: BaseDirectory.AppData,
    });
  }

  async function writeCache(id: number, anime: Anime) {
    const data = {
      data: anime,
      cached_at: Date.now(),
    };

    await writeTextFile(`cache/${id}.json`, JSON.stringify(data), {
      baseDir: BaseDirectory.AppData,
    });
  }

  async function getAnimeWithRetry(
    id: number,
    retries = 10,
    delay = 1000
  ): Promise<any> {
    let attempt = 0;

    while (attempt < retries) {
      try {
        const anime = await animeClient.getAnimeById(id);
        return anime;
      } catch (error: any) {
        if (error.response && error.response.status === 429) {
          attempt++;
          if (attempt < retries) {
            await new Promise((resolve) => setTimeout(resolve, delay));
          } else {
            throw new Error("Too many requests, retries exhausted");
          }
        } else {
          throw error;
        }
      }
    }
  }

  return {
    provide: {
      cache,
    },
  };
});
