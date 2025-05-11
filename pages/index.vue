<template>
  <div
    class="w-full flex justify-center"
    :class="fetching ? 'h-full overflow-hidden' : ''"
  >
    <UiError v-if="errorMessage">
      {{ errorMessage }}
    </UiError>
    <div
      v-else-if="
        (fetching && !fetched) || (fetched && animes && animes.length > 0)
      "
      class="w-full p-3 grid grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-3 h-max select-none"
      :class="fetching ? 'pr-1' : 'pr-2'"
    >
      <TransitionGroup
        name="fade"
        v-if="fetched && animes && animes.length > 0"
      >
        <div
          v-for="anime in animes"
          class="max-w-[260px] w-[1fr] flex flex-col text-center gap-1"
          :key="anime.id"
        >
          <NuxtLink
            :to="`/anime/${anime.id}`"
            class="w-full rounded-md overflow-hidden aspect-[2/3] transition cursor-pointer flex items-center justify-center relative select-none group border-[1px] border-solid border-neutral-200 border-opacity-20"
          >
            <IconExternalLink
              class="z-10 absolute size-6 transition-[opacity] duration-300 opacity-0 group-hover:opacity-100 text-neutral-200"
            />
            <div class="w-full h-full absolute inset-0 z-0 transition bg-black">
              <NuxtImg
                :src="anime.coverImage.extraLarge"
                alt="Cover"
                class="w-full h-full transition object-cover group-hover:scale-105 group-hover:opacity-40"
              />
            </div>
          </NuxtLink>
          <div class="flex flex-col w-full gap-1 select-text">
            <span
              class="text-base text-neutral-200 whitespace-nowrap overflow-hidden overflow-ellipsis"
              :title="anime.title.userPreferred || ''"
              v-tippy="{ interactive: true }"
            >
              {{ anime.title.userPreferred }}
            </span>
            <span class="text-xs capitalize text-neutral-400">
              {{ anime.season?.toLowerCase() }} {{ anime.seasonYear }}
            </span>
          </div>
        </div>
      </TransitionGroup>
      <div
        class="max-w-[260px] w-[1fr] flex flex-col text-center gap-1 animate-pulse items-center"
        v-for="x in 100"
        v-else
      >
        <div
          class="w-full rounded-md overflow-hidden aspect-[2/3] transition flex items-center justify-center relative select-none group border-[1px] border-solid border-neutral-200 border-opacity-20"
        >
          <div
            class="w-full h-full absolute inset-0 z-0 transition bg-neutral-700 bg-opacity-50"
          ></div>
        </div>
        <div class="flex flex-col w-[80%] items-center gap-1">
          <span
            class="text-base rounded-md bg-neutral-700 w-full bg-opacity-40 text-white text-opacity-0 whitespace-nowrap overflow-hidden overflow-ellipsis"
          >
            -
          </span>
          <span
            class="text-xs capitalize w-[60%] rounded-md bg-neutral-700 bg-opacity-30 text-white"
            >-</span
          >
        </div>
      </div>
    </div>
    <div v-else class="p-3">No Animes Found</div>
  </div>
</template>

<script lang="ts" setup>
import type { Media } from "~/types/animes";

const { $api } = useNuxtApp();
const {
  data: animes,
  fetched,
  fetching,
  errorMessage,
} = useWhenAuthentificated<Media[]>($api.anime.all);

definePageMeta({
  pageTransition: {
    name: "slide-right",
    mode: "out-in",
  },
});
</script>

<style lang="scss">
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
