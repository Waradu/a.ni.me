<template>
  <div class="p-8 flex justify-center">
    <div class="flex flex-col max-w-[1000px] w-full" v-if="anime">
      <NuxtImg :src="anime.coverImage.large" class="rounded-md w-64" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useShared from "@waradu/useshared";
import type { MediaDetails } from "~/types/anime";

const route = useRoute();
const id = route.params.id as string;

const { $api } = useNuxtApp();
const { data: anime } = useWhenAuthentificated<MediaDetails | undefined>(() =>
  $api.anime.single(parseInt(id))
);

const bgImage = usePageScopedState("bgImage");
bgImage.value = true;

const title = usePageScopedState("title");

const { data: bgImageSrc } = useShared({
  key: "bgImage",
  data: "",
});

watch(
  () => anime.value?.bannerImage,
  () => {
    if (anime.value?.title.userPreferred)
      title.value = anime.value.title.userPreferred;
  }
);

watch(
  () => anime.value?.title.userPreferred,
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
