<template>
  <div class="p-8 flex justify-center">
    <div class="flex flex-col max-w-[1000px] w-full gap-8" v-if="anime">
      <header class="flex gap-6">
        <NuxtImg
          :src="anime.coverImage.extraLarge"
          class="rounded-md h-80 w-48 aspect-[2/3] object-cover"
        />
        <div class="flex flex-col w-full gap-2">
          <div class="pl-3 flex items-center gap-3 w-full">
            <h1 class="text-xl font-semibold">
              {{ anime.title.userPreferred }}
            </h1>
            <div class="flex gap-1 select-none">
              <div
                v-for="link in anime.externalLinks.slice(0, 4)"
                :key="link.id"
                :title="link.site"
                @click="openUrl(link.url)"
                v-tippy
                :style="{ '--color': link.color ?? '#ffffff20' }"
                class="flex items-center justify-center p-2 transition-colors hover:bg-[var(--color)] rounded-full cursor-pointer h-9 w-9"
              >
                <img class="w-4 h-4" :src="link.icon ?? '/globe.png'" alt="" />
              </div>
            </div>
            <div class="flex gap-1 ml-auto">
              <UiToggleIcon
                v-slot="props"
                v-model="inLibrary"
                :title="inLibrary ? 'In Library' : 'Not In Library'"
                v-tippy
              >
                <IconX :class="props.true" />
                <IconCheck :class="props.false" />
              </UiToggleIcon>
            </div>
          </div>
          <div
            v-if="anime.description"
            class="w-full p-2 px-3 transition-colors rounded-md cursor-pointer select-none hover:bg-neutral-700 hover:bg-opacity-50"
          >
            <p
              v-html="anime.description"
              class="overflow-hidden line-clamp-[8] w-full"
            ></p>
          </div>
          <div v-else class="p-2 px-3 -ml-3 select-none w-full">
            <p>No description found!</p>
          </div>
          <div class="pl-3 flex gap-2 select-none mt-auto mb-2">
            <div
              v-for="genre in anime.genres"
              :key="genre"
              class="p-[3px] pb-1 px-2 text-xs bg-neutral-700 bg-opacity-20 rounded-md border-[1px] border-neutral-700 text-neutral-200"
            >
              # {{ genre }}
            </div>
          </div>
        </div>
      </header>
      <div class="flex w-full overflow-hidden overflow-x-scroll gap-4 select-none pb-2">
        <div v-for="character in anime.characters.nodes" :key="character.id" class="flex flex-col gap-1 items-center text-center">
          <NuxtImg :src="character.image.large" class="min-w-28 max-w-28 min-h-40 max-h-40 object-cover rounded-md" />
          <div class="text-sm text-neutral-200 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-28" :title="character.name.userPreferred" v-tippy>{{ character.name.userPreferred }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { openUrl } from "@tauri-apps/plugin-opener";
import useShared from "@waradu/useshared";
import type { MediaDetails } from "~/types/anime";

const route = useRoute();
const id = route.params.id as string;

const { $api } = useNuxtApp();
const { data: anime } = useWhenAuthentificated<MediaDetails | undefined>(() =>
  $api.anime.single(parseInt(id))
);

const inLibrary = ref(anime.value?.mediaListEntry != null);

watch(
  () => anime.value?.mediaListEntry,
  (val) => {
    inLibrary.value = anime.value?.mediaListEntry != null;
  }
);

const bgImage = usePageScopedState("bgImage");
bgImage.value = true;

const title = usePageScopedState("title");

const { data: bgImageSrc } = useShared({
  key: "bgImage",
  data: "",
});

watch(
  () => anime.value?.title.userPreferred,
  () => {
    if (anime.value?.title.userPreferred)
      title.value = anime.value.title.userPreferred;
  }
);

watch(
  () => anime.value?.bannerImage,
  () => {
    if (anime.value?.bannerImage) bgImageSrc.value = anime.value.bannerImage;
  }
);

const charactersContainer = ref<HTMLElement | null>(null);

definePageMeta({
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});
</script>
