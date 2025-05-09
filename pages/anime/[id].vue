<template>
  <div>
    {{ anime?.title.userPreferred }}
  </div>
</template>

<script lang="ts" setup>
import type { MediaDetails } from "~/types/anime";

const { $api } = useNuxtApp();
const { data: anime } = useWhenAuthentificated<MediaDetails | undefined>(() =>
  $api.anime.single(1)
);

const bgImage = usePageScopedState<string>("bgImage");

watch(
  () => anime.value?.bannerImage,
  () => {
    if (anime.value?.bannerImage) bgImage.value = anime.value.bannerImage;
  }
);
</script>
