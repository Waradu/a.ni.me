import { GraphQL, field, param } from "wrdu-graphql";
import type {
  AnilistAnime,
  AnilistResponse,
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
  field("meanScore"),
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

export default defineNuxtPlugin((nuxtApp) => {
  const perPage = 50;

  const api = {
    async anime(id: number): Promise<AnilistAnime> {
      const builder = new GraphQL("https://graphql.anilist.co", [
        field("Media")
          .params([param("id", id), param("type", "ANIME")])
          .children(animeGraph),
      ]);

      const anime = await builder.get<AnilistResponse>();

      return anime.Media;
    },
    async animes(ids: number[]): Promise<AnilistAnime[]> {
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
                .children(animeGraph),
            ]),
        ]);

        return (await builder.get<PagedAnilistResponse>()).Page;
      };

      let animes: AnilistAnime[] = [];

      let page = 1;

      const load = async () => {
        const a = await bulk(page);
        animes = [...animes, ...a.media];
        page += 1;
        if (page > 20 || page > Math.ceil(ids.length / perPage)) return;
        if (a.pageInfo.hasNextPage) await load();
      };

      await load();

      return animes;
    },
    async search(term: string): Promise<AnilistAnime[]> {
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
            field("media")
              .params([
                param("search", term, true),
                param("type", "ANIME"),
                param("format_in", ["TV", "TV_SHORT", "ONA"]),
              ])
              .children(animeGraph),
          ]),
      ]);

      const animes = await builder.get<PagedAnilistResponse>();

      return animes.Page.media;
    },
  };

  return {
    provide: {
      api,
    },
  };
});
