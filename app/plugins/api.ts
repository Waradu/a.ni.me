import gql from "graphql-tag";
import type { AnimeQueryResponse } from "~/types/anime";
import type { GetUserAnimeCollection } from "~/types/animes";
import type { UserDataResponse } from "~/types/viewer";

export default defineNuxtPlugin(() => {
  const auth = useAuthStore();
  const { $apollo } = useNuxtApp();

  const api = {
    anime: {
      all: async () => {
        if (!auth.token || !auth.user) return [];

        const query = gql`
          query GetUserAnimeCollection($userId: Int) {
            MediaListCollection(userId: $userId, type: ANIME) {
              lists {
                entries {
                  id
                  private
                  score
                  status
                  media {
                    title {
                      userPreferred
                    }
                    coverImage {
                      extraLarge
                    }
                    format
                    id
                    isFavourite
                    season
                    seasonYear
                  }
                }
                isCustomList
              }
            }
          }
        `;

        const response = await $apollo.get<GetUserAnimeCollection>(
          {
            query: query,
            variables: {
              userId: auth.user.id,
            },
          },
          auth.token
        );

        return (
          response?.MediaListCollection.lists.find((list) => !list.isCustomList)
            ?.entries || []
        );
      },
      single: async (id: number) => {
        if (!auth.token || !auth.user) return;

        const query = gql`
          query Media($mediaId: Int) {
            Media(id: $mediaId) {
              bannerImage
              coverImage {
                extraLarge
                color
              }
              title {
                userPreferred
              }
              trailer {
                id
                site
                thumbnail
              }
              externalLinks {
                id
                color
                icon
                site
                url
              }
              isFavourite
              isAdult
              genres
              tags {
                name
              }
              status
              season
              seasonYear
              recommendations(perPage: 5) {
                nodes {
                  media {
                    id
                    title {
                      userPreferred
                    }
                    coverImage {
                      extraLarge
                    }
                  }
                }
              }
              popularity
              favourites
              description
              averageScore
              characters(sort: RELEVANCE) {
                nodes {
                  id
                  image {
                    large
                  }
                  name {
                    userPreferred
                  }
                }
              }
              mediaListEntry {
                id
                private
                score
                status
              }
            }
          }
        `;

        const response = await $apollo.get<AnimeQueryResponse>(
          {
            query: query,
            variables: {
              mediaId: id,
            },
          },
          auth.token
        );

        return response?.Media;
      },
    },
    user: {
      profile: async () => {
        if (!auth.token) return;

        const query = gql`
          query Viewer {
            Viewer {
              id
              name
              avatar {
                large
              }
              bannerImage
              options {
                displayAdultContent
                titleLanguage
              }
              siteUrl
            }
          }
        `;

        const response = await $apollo.get<UserDataResponse>(
          {
            query: query,
          },
          auth.token
        );

        return response?.Viewer;
      },
    },
  };

  return {
    provide: {
      api,
    },
  };
});
