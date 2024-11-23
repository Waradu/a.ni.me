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
  field("coverImage").children([field("extraLarge"), field("color")]),
  field("source"),
  field("bannerImage"),
  field("season"),
  field("seasonYear"),
  field("description").params([param("asHtml", true)]),
  field("episodes"),
  field("genres"),
  field("averageScore"),
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
      field("name").children([field("full")]),
      field("age"),
      field("image").children([field("large")]),
    ]),
  ]),
];

export default defineNuxtPlugin((nuxtApp) => {
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
      const perPage = 50;

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
  };

  return {
    provide: {
      api,
    },
  };
});
