<template>
  <div class="card" v-for="anime in filteredAnimes">
    <NuxtLink class="image" @click.prevent="add(anime.mal_id)">
      <AddIcon class="open" />
      <div class="cover">
        <img :src="anime.images.jpg.large_image_url || anime.images.jpg.image_url"
          onerror="this.onerror=null; this.src='/transparent.png'" alt="Cover">
      </div>
    </NuxtLink>
    <div class="text">
      <span class="title" :title="anime.title_english || anime.title">{{ anime.title_english || anime.title }}</span>
      <p class="info" v-if="anime.year > 0">{{ anime.year }}</p>
      <p class="info" v-else>N/A</p>
    </div>
  </div>
  <div class="card" v-if="filteredAnimes.length == 0 && !loading">
    <div class="image">
      <div class="cover">
        <div class="img">
          <AddIcon class="add" style="rotate: 45deg;" />
        </div>
      </div>
    </div>
    <div class="text">
      <span class="title">Nothing Found</span>
      <p class="info"></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AddIcon from "~/node_modules/@fluentui/svg-icons/icons/add_32_filled.svg";
import { AnimeClient } from '@tutkli/jikan-ts';
import type { CombinedAnime } from "~/types/db";

const { $database, $emitter } = useNuxtApp();

const titlebarStore = useTitlebarStore();

const animes = ref<CombinedAnime[]>([]);

const savedAnimes = ref<CombinedAnime[]>([]);

const savedAnimeIds = computed(() => {
  return savedAnimes.value.map((a) => {
    return a.data.mal_id;
  })
});

const loading = ref(true);

const filteredAnimes = computed(() => {
  const term = titlebarStore.search.toLowerCase();

  return animes.value.map(a => {
    return a.data;
  }).filter((a) => {
    return (
      !savedAnimeIds.value.includes(a.mal_id) && (a.title.toLowerCase().includes(term) ||
        (a.title_english && a.title_english.toLowerCase().includes(term)) ||
        a.synopsis.toLowerCase().includes(term))
    )
  })
})

const add = async (id: number) => {
  await $database.add(id)
  titlebarStore.setSearch("");
  $emitter.emit("stopSearch")
}

const animeClient = new AnimeClient();

onMounted(async () => {
  $emitter.off('search');

  $emitter.on('search', async () => {
    searchMAL()
  });

  try {
    await searchMAL()
    savedAnimes.value = await $database.animes();
  } finally {
    loading.value = false
  }
})

const searchMAL = async () => {
  if (titlebarStore.getSearch() == "") {
    return;
  }

  const res = await animeClient.getAnimeSearch({
    q: titlebarStore.getSearch(),
    sfw: true,
  })

  const resMovies = await animeClient.getAnimeSearch({
    q: titlebarStore.getSearch(),
    sfw: true,
  })

  titlebarStore.setSearch("")

  animes.value = res.data.map(a => {
    return {
      id: 0,
      created_at: "",
      stars: 0,
      rewatch_count: 0,
      recommended_by: "",
      watched: false,
      data: a
    }
  }).filter(a => {
    return a.data.type == "TV" || a.data.type == "Movie"
  })
}
</script>