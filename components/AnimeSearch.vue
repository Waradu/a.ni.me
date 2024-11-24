<template>
  <TransitionGroup name="fade">
    <template v-for="anime in animes" :key="anime.id">
      <Anime :anime="anime" />
    </template>
  </TransitionGroup>
</template>

<script lang="ts" setup>
import type { MinimalAnilistAnime } from "~/types/anilist";

const { $api, $emitter } = useNuxtApp();

const titlebarStore = useTitlebarStore();

const animes = ref<MinimalAnilistAnime[]>([]);

const get = async () => {
  const term = titlebarStore.getSearch();

  if (term == "") return;

  animes.value = await $api.search(term);
};

await get();

onMounted(() => {
  $emitter.off("search");
  $emitter.on("search", async () => {
    await get();
  });
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
