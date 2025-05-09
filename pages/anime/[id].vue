<template>
  <div></div>
</template>

<script lang="ts" setup>
import type { MediaDetails } from "~/types/anime";

const { $api } = useNuxtApp();
const { data: anime } = useWhenAuthentificated<MediaDetails | undefined>(() =>
  $api.anime.single(1)
);

const backgroundImage = computed(() => anime.value?.bannerImage ?? null);
</script>
