<template>
  <div class="page">
    <Titlebar />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import Database from '@tauri-apps/plugin-sql';
import type { DbAnime } from '~/types/db';

onMounted(async () => {
  /* const db = await Database.load('sqlite:anilist.db');

  await db.execute(`
    INSERT INTO animes (id, created_at, name, url, image, trailer, approved, episodes, airing, status, rating, popularity, score, scored_by, favorites, synopsis, year, stars, watched)
    VALUES 
    (1, CURRENT_TIMESTAMP, 'Attack on Titan', 'https://myanimelist.net/anime/16498/Shingeki_no_Kyojin', 'https://cdn.myanimelist.net/images/anime/10/47347.jpg', '', true, 25, false, 'Finished Airing', 'R', 10, 8.52, 10000, 5000, 'Humans in a walled city defend against giant humanoid Titans.', 2013, 9, true),
    (2, CURRENT_TIMESTAMP, 'Naruto', 'https://myanimelist.net/anime/20/Naruto', 'https://cdn.myanimelist.net/images/anime/13/17405.jpg', '', true, 220, false, 'Finished Airing', 'PG-13', 9, 7.95, 8000, 4000, 'A young ninja strives to be the best and protect his village.', 2002, 8, true),
    (3, CURRENT_TIMESTAMP, 'Fullmetal Alchemist: Brotherhood', 'https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood', 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg', '', true, 64, false, 'Finished Airing', 'PG-13', 8, 9.23, 15000, 12000, 'Two brothers seek the philosopher''s stone after a failed alchemy experiment.', 2009, 10, true)
  `); */
})
</script>

<style lang="scss">
@import "~/assets/css/basic.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#__nuxt,
.page {
  width: 100%;
  height: 100%;
  background-color: transparent;
  font-family: 'Segoe UI', sans-serif;
  color: white;
  overflow: hidden;
}

main {
  margin-top: 60px;
  height: calc(100% - 60px);
  overflow: auto;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  margin-block: 5px;
}

::-webkit-scrollbar-thumb {
  background: #bebebe40;
  border: 4px solid transparent;
  border-radius: 10px;
  background-clip: padding-box;
}

::-webkit-scrollbar-thumb:hover {
  background: #bebebe60;
  border: 2px solid transparent;
  background-clip: padding-box;
}

::-webkit-scrollbar:hover {
  width: 10px;
}

h1 {
  @extend %title1;
}

h2 {
  @extend %title2;
}

h3 {
  @extend %title3;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease-in-out;
}
.page-enter-from {
  opacity: 0;
  translate: 0 50px;
}

.page-leave-to {
  opacity: 0;
}
</style>