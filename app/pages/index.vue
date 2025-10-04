<template>
  <div
    class="flex w-full justify-center"
    :class="!fetched ? 'h-full overflow-hidden' : ''"
  >
    <UiError v-if="errorMessage">
      {{ errorMessage }}
    </UiError>
    <div
      v-else-if="!fetched || (fetched && listEntries && entries.length > 0)"
      class="grid h-max w-full grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-3 p-3 select-none"
      :class="!fetched ? 'pr-1' : 'pr-2'"
    >
      <TransitionGroup
        v-if="fetched && listEntries && entries.length > 0"
        name="fade"
      >
        <template v-for="entry in entries">
          <div
            v-if="entry && entry.media"
            :key="entry.id"
            class="flex w-[1fr] max-w-[260px] flex-col gap-1 text-center"
          >
            <NuxtLink
              :to="`/anime/${entry.media.id}`"
              class="group relative flex aspect-[2/3] w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-solid border-neutral-200/20 transition select-none"
            >
              <LucideExternalLink
                class="absolute z-10 size-6 text-neutral-200 opacity-0 transition-[opacity] duration-300 group-hover:opacity-100"
              />
              <div
                class="absolute inset-0 z-0 h-full w-full bg-black transition"
              >
                <NuxtImg
                  :src="entry.media.coverImage?.extraLarge ?? undefined"
                  alt="Cover"
                  class="h-full w-full object-cover transition group-hover:scale-105 group-hover:opacity-40"
                />
              </div>
            </NuxtLink>
            <div class="flex w-full flex-col select-text">
              <span
                v-tippy="{ interactive: true }"
                class="overflow-hidden text-base overflow-ellipsis whitespace-nowrap text-neutral-200"
                :title="entry.media.title?.userPreferred || ''"
              >
                {{ entry.media.title?.userPreferred }}
              </span>
              <span class="text-xs text-neutral-400 capitalize">
                <template v-if="entry.media.season && entry.media.seasonYear">
                  {{ entry.media.season?.toLowerCase() }}
                  {{ entry.media.seasonYear }}
                </template>
                <template v-else> Unknown Season </template>
              </span>
            </div>
          </div>
        </template>
      </TransitionGroup>
      <div
        v-for="x in 100"
        v-else
        :key="x"
        class="flex w-[1fr] max-w-[260px] animate-pulse flex-col items-center gap-1 text-center"
      >
        <div
          class="group relative flex aspect-[2/3] w-full items-center justify-center overflow-hidden rounded-md border border-solid border-neutral-200/20 transition select-none"
        >
          <div
            class="absolute inset-0 z-0 h-full w-full bg-neutral-700/50 transition"
          ></div>
        </div>
        <div class="flex w-[80%] flex-col items-center gap-1">
          <span
            class="w-full overflow-hidden rounded-md bg-neutral-700/40 text-base overflow-ellipsis whitespace-nowrap text-white/0"
          >
            -
          </span>
          <span
            class="w-[60%] rounded-md bg-neutral-700/30 text-xs text-white capitalize"
            >-</span
          >
        </div>
      </div>
    </div>
    <div v-else class="p-3">No Animes Found</div>
  </div>
</template>

<script lang="ts" setup>
import { LucideExternalLink } from "lucide-vue-next";
import { GetUserAnimeCollectionDocument } from "~/gql/gen/types.generated";

const { $apollo } = useNuxtApp();

const {
  data: listEntries,
  fetched,
  errorMessage,
} = useWhenAuthentificated(
  async (user) =>
    await $apollo.query(GetUserAnimeCollectionDocument, {
      userId: user.id,
    }),
);

const entries = computed(() => {
  const lists = listEntries.value?.MediaListCollection?.lists ?? [];
  return lists.flatMap((g) => g?.entries ?? []);
});

definePageMeta({
  pageTransition: {
    name: "slide-right",
    mode: "out-in",
  },
});
</script>

<style>
html:not(:has(.reduced)) {
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
}
</style>
