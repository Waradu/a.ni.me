import gql from "graphql-tag";
import { GraphQL, field, param } from "wrdu-graphql";
import type {
  AnilistAnime,
  AnilistAnimeID,
  AnilistResponse,
  MinimalAnilistAnime,
  PagedAnilistResponse,
} from "~/types/anilist";

const animeGraph = [
  field("id"),
  field("idMal"),
  field("title").children([field("romaji"), field("english")]),
  field("isAdult"),
  field("coverImage").children([field("extraLarge", "url"), field("color")]),
  field("source"),
  field("bannerImage"),
  field("season"),
  field("seasonYear"),
  field("status"),
  field("description").params([param("asHtml", false)]),
  field("episodes"),
  field("genres"),
  field("averageScore"),
  field("meanScore"),
  field("favourites"),
  field("popularity"),
  field("favourites"),
  field("externalLinks").children([
    field("color"),
    field("icon"),
    field("site"),
    field("url"),
    field("isDisabled"),
    field("type"),
  ]),
  field("characters").children([
    field("nodes").children([
      field("id"),
      field("name").children([field("full")]),
      field("age"),
      field("image").children([field("large", "url")]),
    ]),
  ]),
];

const minimalAnimeGraph = [
  field("id"),
  field("title").children([field("romaji"), field("english")]),
  field("coverImage").children([field("extraLarge", "url"), field("color")]),
  field("season"),
  field("seasonYear"),
  field("description").params([param("asHtml", false)]),
  field("averageScore"),
  field("favourites"),
  field("popularity"),
  field("favourites"),
];

export default defineNuxtPlugin((nuxtApp) => {
  const perPage = 50;

  const api = {
    async get<T>(builder: GraphQL) {
      const query = gql`
        ${builder.string("query")}
      `;

      const { data, errors } = await (window as any).$apolloClient.query({
        query,
      });

      if (errors) throw new Error(errors[0].message);

      return data as T;
    },
    async anime(id: number): Promise<AnilistAnime> {
      const builder = new GraphQL("https://graphql.anilist.co", [
        field("Media")
          .params([param("id", id), param("type", "ANIME")])
          .children(animeGraph),
      ]);

      const data = await this.get<AnilistResponse<AnilistAnime>>(builder);

      return data.Media;
    },
    async animes(ids: number[]): Promise<MinimalAnilistAnime[]> {
      const bulk = async (page: number) => {
        const builder = new GraphQL("https://graphql.anilist.co", [
          field("Page")
            .params([param("perPage", perPage), param("page", page)])
            .children([
              field("pageInfo").children([
                field("currentPage"),
                field("hasNextPage"),
                field("lastPage"),
                field("perPage"),
                field("total"),
              ]),
              field("media")
                .params([param("id_in", ids), param("type", "ANIME")])
                .children(minimalAnimeGraph),
            ]),
        ]);

        const data = await this.get<PagedAnilistResponse<MinimalAnilistAnime>>(
          builder
        );

        return data.Page;
      };

      let animes: MinimalAnilistAnime[] = [];

      let page = 1;

      const load = async () => {
        const a = await bulk(page);
        animes = [...animes, ...a.media];
        page += 1;
        if (page > 20 || page > Math.ceil(ids.length / perPage)) return;
        if (a.pageInfo.hasNextPage) await load();
      };

      await load();

      const notFound = ids.filter((id) => !animes.find((a) => a.id == id));

      notFound.forEach(async (id) => {
        try {
          await this.anime(id);
        } catch (e: any) {
          if ("message" in e && e.message == "Not Found.") {
            const { $database } = useNuxtApp();

            await $database.delete(id);
          }
        }
      });

      return animes;
    },
    async search(
      term: string,
      seasonSelected?: string,
      seasonYearSelected?: string
    ): Promise<MinimalAnilistAnime[]> {
      const params = [param("type", "ANIME")];

      if (term != "") {
        params.push(param("search", term, true));
      }

      if (seasonSelected && seasonSelected != "") {
        params.push(param("season", seasonSelected));
      }

      if (seasonYearSelected && seasonYearSelected != "") {
        params.push(param("seasonYear", seasonYearSelected));
      }

      const settingsStore = useSettingsStore();

      if (settingsStore.tvAndMovieOnly) {
        params.push(param("format_in", ["TV", "TV_SHORT", "ONA", "MOVIE"]));
      }

      if (!settingsStore.showNSFW) {
        params.push(param("isAdult", false));
      }

      const builder = new GraphQL("https://graphql.anilist.co", [
        field("Page")
          .params([param("perPage", 50)])
          .children([
            field("pageInfo").children([
              field("currentPage"),
              field("hasNextPage"),
              field("lastPage"),
              field("perPage"),
              field("total"),
            ]),
            field("media").params(params).children(animeGraph),
          ]),
      ]);

      const animes = await this.get<PagedAnilistResponse<MinimalAnilistAnime>>(
        builder
      );

      return animes.Page.media;
    },
    async convertAnime(id: number): Promise<number> {
      const builder = new GraphQL("https://graphql.anilist.co", [
        field("Media")
          .params([param("idMal", id), param("type", "ANIME")])
          .children([field("id"), field("idMal")]),
      ]);

      const anime = await this.get<AnilistResponse<AnilistAnimeID>>(builder);

      return anime.Media.id;
    },
    async convertAnimes(ids: number[]): Promise<number[]> {
      const bulk = async (page: number) => {
        const builder = new GraphQL("https://graphql.anilist.co", [
          field("Page")
            .params([param("perPage", perPage), param("page", page)])
            .children([
              field("pageInfo").children([
                field("currentPage"),
                field("hasNextPage"),
                field("lastPage"),
                field("perPage"),
                field("total"),
              ]),
              field("media")
                .params([param("idMal_in", ids), param("type", "ANIME")])
                .children([field("id"), field("idMal")]),
            ]),
        ]);

        return (await this.get<PagedAnilistResponse<AnilistAnimeID>>(builder))
          .Page;
      };

      let animes: AnilistAnimeID[] = [];

      let page = 1;

      const load = async () => {
        const a = await bulk(page);
        animes = [...animes, ...a.media];
        page += 1;
        if (page > 20 || page > Math.ceil(ids.length / perPage)) return;
        if (a.pageInfo.hasNextPage) await load();
      };

      await load();

      ids.forEach((id, i) => {
        const anime = animes.find((a) => a.idMal == id);
        if (!anime) ids[i] = 0;
        else ids[i] = anime.id;
      });

      console.log(ids);

      return ids;
    },
  };

  return {
    provide: {
      api,
    },
  };
});
