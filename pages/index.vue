<template>
  <main class="index">
    <div class="grid-container">
      <div class="grid">
        <Card v-for="anime in search" :key="anime.id" :anime="anime" :link="'/anime/' + anime.id"
          :onClick="() => titlebarStore.setBackLink('/')" />
        <Card :anime="null" v-if="search.length == 0" />
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { AnimeClient } from '@tutkli/jikan-ts';
import type { Anime } from '~/types/anime';

const { $database, $emitter } = useNuxtApp();

const titlebarStore = useTitlebarStore();
titlebarStore.setTitle("Animes")
titlebarStore.setBackLink("")

const animes = ref<Anime[]>([])
animes.value = await $database.animes();

const searching = ref(false)

$emitter.on('dataUpdated', async () => {
  animes.value = await $database.animes();
});

$emitter.on('search', async () => {
  if (titlebarStore.getSearch().length < 1) return;

  const animeClient = new AnimeClient();

  const res = await animeClient.getAnimeSearch({
    q: titlebarStore.getSearch()
  })

  animes.value = await Promise.all(res.data.map(async (a) => {
    return await $database.convert(a, 0)
  }))

  searching.value = true;
  titlebarStore.setTitle("Searching")
});

const search = computed(() => {
  return animes.value.filter((a) => {
    return a.name.toLowerCase().includes(titlebarStore.search.toLowerCase()) || searching.value
  }).sort(
    (a, b) => {
      if (a.year > b.year) {
        return -1
      }

      if (a.year < b.year) {
        return 1
      }

      return 0
    }
  );
})

const keyboard = useKeyboard()

keyboard.up("Escape", async () => {
  searching.value = false;
  titlebarStore.setTitle("Animes")
  animes.value = await $database.animes();
})

onBeforeUnmount(() => {
  keyboard.stop()
})
</script>

<style lang="scss">
main.index {
  .grid-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .grid {
      padding: 30px;
      padding-top: 10px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 20px;
      width: 100%;
      height: max-content;
    }
  }
}
</style>