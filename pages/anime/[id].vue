<template>
  <div>
    {{ anime?.title.userPreferred }}
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

const bgImage = usePageScopedState<boolean>("bgImage");
bgImage.value = true;

const { data: bgImageSrc } = useShared({
  key: "bgImage",
  data: "",
});

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
