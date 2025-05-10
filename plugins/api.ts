import gql from "graphql-tag";
import type { AnimeQueryResponse } from "~/types/anime";
import type { GetUserAnimeCollection } from "~/types/animes";

export default defineNuxtPlugin((nuxtApp) => {
  const { auth } = useAuth();
  const { $apollo } = useNuxtApp();

  const api = {
    anime: {
      all: async () => {
        if (!auth.value?.token || !auth.value.user) return [];

        const query = gql`
          query GetUserAnimeCollection($userId: Int) {
            MediaListCollection(userId: $userId, type: ANIME) {
              lists {
                entries {
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
              userId: auth.value.user.id,
            },
          },
          auth.value.token
        );

        return (
          response.MediaListCollection.lists
            .find((list) => !list.isCustomList)
            ?.entries.map((entry) => entry.media) || []
        );
      },
      single: async (id: number) => {
        if (!auth.value?.token || !auth.value.user) return;

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
              externalLinks {
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
                  image {
                    large
                  }
                  name {
                    userPreferred
                  }
                }
              }
              mediaListEntry {
                private
                score
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
          auth.value.token
        );

        return response.Media;
      },
    },
    user: {
      profile: async () => {
        if (!auth.value?.token) return;

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
          auth.value.token
        );

        return response.Viewer;
      },
    },
  };

  return {
    provide: {
      api,
    },
  };
});
