import gql from "graphql-tag";
import type { GetUserAnimeCollection } from "~/types/anime";

export default defineNuxtPlugin((nuxtApp) => {
  const { auth } = useAuth();
  const { $apollo } = useNuxtApp();

  const api = {
    anime: {
      user: {
        list: async () => {
          if (!auth.value?.token || !auth.value.user) return [];

          const getUserAnimeCollection = gql`
            query GetUserAnimeCollection($userId: Int) {
              MediaListCollection(userId: $userId, type: ANIME) {
                lists {
                  entries {
                    media {
                      title {
                        english
                      }
                      coverImage {
                        large
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
              query: getUserAnimeCollection,
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
      },
    },
  };

  return {
    provide: {
      api,
    },
  };
});
