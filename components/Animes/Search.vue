<template>
  <div class="card" v-for="anime in filteredAnimes">
    <NuxtLink class="image" @click="redirect($event, anime.id)">
      <OpenIcon class="open" />
      <div class="cover">
        <img :src="anime.image" onerror="this.onerror=null; this.src='/transparent.png'" alt="Cover">
      </div>
    </NuxtLink>
    <div class="text">
      <span class="title" :title="anime.name">{{ anime.name }}</span>
      <p class="info" v-if="anime.year > 0">{{ anime.year }}</p>
      <p class="info" v-else>N/A</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Anime } from '~/types/anime';
import OpenIcon from "~/node_modules/@fluentui/svg-icons/icons/open_32_filled.svg";
import { AnimeClient } from '@tutkli/jikan-ts';

const { $database, $emitter } = useNuxtApp();

const titlebarStore = useTitlebarStore();

const animes = ref<Anime[]>([]);
const loading = ref(true)
var lastSearch = ""

const filteredAnimes = computed(() => {
  return animes.value.filter((a) => {
    return a.name.toLowerCase().includes(titlebarStore.search.toLowerCase())
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

const redirect = (e: MouseEvent, id: number) => {
  e.preventDefault()
  titlebarStore.setBackLink('/')
  navigateTo(`/anime/${id}`)
}

const animeClient = new AnimeClient();

onMounted(async () => {
  try {
    await searchMAL()
  } finally {
    loading.value = false
  }
})

const searchMAL = async () => {
  const res = await animeClient.getAnimeSearch({
    q: titlebarStore.getSearch(),
    sfw: true
  })

  animes.value = await Promise.all(res.data.map(async (a) => {
    return await $database.convert(a, 0)
  }))
}

$emitter.on('search', async () => {
  if (titlebarStore.getSearch() == "" || lastSearch == titlebarStore.getSearch()) {
    return;
  }

  searchMAL()

  lastSearch = titlebarStore.getSearch()
});
</script>