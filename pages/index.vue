<template>
  <div class="w-full flex justify-center">
    <div
      v-if="fetched && animes.length > 0"
      class="w-full p-3 pr-2 grid grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-3 h-max"
    >
      <TransitionGroup name="fade">
        <div
          v-for="anime in animes"
          class="max-w-[260px] w-[1fr] flex flex-col text-center gap-1"
        >
          <NuxtLink
            :to="`/anime/${anime.id}`"
            class="w-full rounded-md overflow-hidden aspect-[2/3] transition cursor-pointer flex items-center justify-center relative select-none group border-[1px] border-solid border-neutral-200 border-opacity-20"
          >
            <IconExternalLink
              class="z-10 absolute size-6 transition-[opacity] duration-300 opacity-0 group-hover:opacity-100 text-neutral-200"
            />
            <div class="w-full h-full absolute inset-0 z-0 transition bg-black">
              <img
                :src="anime.coverImage.large"
                alt="Cover"
                class="w-full h-full transition object-cover group-hover:scale-105 group-hover:opacity-40"
              />
            </div>
          </NuxtLink>
          <div class="flex flex-col w-full">
            <span class="text-base text-neutral-200 whitespace-nowrap overflow-hidden overflow-ellipsis">
              {{ anime.title.english }}
            </span>
            <span class="text-xs capitalize text-neutral-400">
              {{ anime.season?.toLowerCase() }} {{ anime.seasonYear }}
            </span>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div v-else-if="!fetched">fetching...</div>
    <div v-else>No Animes Found</div>
  </div>
</template>

<script lang="ts" setup>
import { gql } from "graphql-request";
import type { GetUserAnimeCollection, Media } from "~/types/anime";

const { auth } = useAuth();

const animes = useState<Media[]>("animes", () => []);
const fetched = useState<boolean>("animesFetched", () => false);

watch(
  () => auth.value?.user,
  async () => {
    if (!auth.value?.user) return;
    if (fetched.value) return;

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

    fetched.value = true;

    const response = await anilistFetch<GetUserAnimeCollection>(
      {
        query: getUserAnimeCollection,
        variables: {
          userId: auth.value.user.id,
        },
      },
      auth.value.token
    );

    animes.value =
      response.data.MediaListCollection.lists
        .find((list) => !list.isCustomList)
        ?.entries.map((entry) => entry.media) || [];
  },
  { immediate: true }
);

definePageMeta({
  pageTransition: {
    name: "slide-right",
    mode: "out-in",
  },
});
</script>

<style lang="scss">
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.fade-leave-active {
  transition: all 0.1s ease-in-out;
  opacity: 0;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  scale: 0.8;
}

.fade-leave-active {
  position: fixed;
}
</style>
