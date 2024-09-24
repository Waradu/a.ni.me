<template>
  <div class="card" v-for="anime in filteredAnimes">
    <NuxtLink class="image" @click.prevent="redirect(anime.id)">
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
import type { Anime } from '~/types/anime';
import OpenIcon from "~/node_modules/@fluentui/svg-icons/icons/open_32_filled.svg";
import AddIcon from "~/node_modules/@fluentui/svg-icons/icons/add_32_filled.svg";

const { $database, $emitter } = useNuxtApp();
const titlebarStore = useTitlebarStore();

const animes = ref<Anime[]>([]);
const loading = ref(true)

$emitter.on('dataUpdated', async () => {
  animes.value = await $database.animes();
});

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

const redirect = (id: number) => {
  titlebarStore.setBackLink('/')
  navigateTo(`/anime/${id}`)
}

animes.value = await $database.animes();
onMounted(async () => {
  loading.value = false
})
</script>

<style lang="scss">
.card {
  max-width: 220px;
  width: 1fr;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;

  .image {
    width: 100%;
    border-radius: 8px;
    aspect-ratio: 2 / 3;
    box-shadow: 0px 5px 10px #00000010;
    transition: .2s ease-in-out;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    color: white;

    .open {
      scale: 2.5;
      opacity: 0;
      transition: .2s ease-in-out;
      z-index: 1;
    }

    .add {
      scale: 2.5;
      transition: .2s ease-in-out;
      z-index: 1;
    }

    .cover {
      background-color: #ffffff10;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 0;
      transition: .2s ease-in-out;

      img {
        width: 100%;
        height: 100%;
        transition: .2s ease-in-out;
      }

      .img {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: .2s ease-in-out;
        color: #ff8686;
      }

      &:has(.img) {
        background-color: #ff868610;
      }
    }

    &:hover {
      img {
        scale: 1.1;
      }

      .img {
        scale: 1.2;
      }

      .open {
        opacity: 1;
      }

      .cover:not(:has(.img)) {
        filter: brightness(40%);
      }
    }

    &:active {
      scale: 0.95;

      img {
        scale: 1;
      }

      .img {
        scale: 1;
      }
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    width: 100%;

    span {
      @extend %subtitle1;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;
    }

    p {
      @extend %body1;
      color: #ffffff80;
    }
  }
}
</style>