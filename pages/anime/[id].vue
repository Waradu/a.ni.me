<template>
  <div class="p-8 flex justify-center">
    <div class="flex flex-col max-w-[1000px] w-full" v-if="anime">
      <header class="flex gap-4">
        <NuxtImg :src="anime.coverImage.extraLarge" class="rounded-md h-80 w-48 aspect-[2/3] object-cover" />
        <div class="flex flex-col pt-4 w-full">
          <div class="flex items-center gap-3 w-full">
            <h1 class="text-xl font-semibold" >
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
              <UiToggleIcon v-slot="props" v-model="inLibrary" :title="inLibrary ? 'In Library' : 'Not In Library'" v-tippy>
                <IconX :class="props.true" />
                <IconCheck :class="props.false" />
              </UiToggleIcon>
            </div>
          </div>
        </div>
      </header>
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

definePageMeta({
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});
</script>
