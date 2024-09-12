<template>
  <main class="grid">
    <div class="grid-container">
      <div class="grid">
        <div class="card" v-for="anime in animes" :key="anime.id">
          <NuxtLink class="image" @click="titlebarStore.setBackLink('/grid')" :to="'/anime/' + anime.id">
            <PlayIcon class="play" />
            <div class="cover">
              <img :src="anime.image"
                onerror="this.onerror=null; this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/joL2kcAAAAASUVORK5CYII='"
                alt="not found">
            </div>
          </NuxtLink>
          <div class="text">
            <span class="title" :title="anime.name">{{ anime.name }}</span>
            <p class="info">{{ anime.year }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import type { Anime } from '~/types/anime';
import PlayIcon from "~/node_modules/@fluentui/svg-icons/icons/play_32_filled.svg";

const { $database } = useNuxtApp();

const titlebarStore = useTitlebarStore();
titlebarStore.setTitle("Animes")
titlebarStore.setBackLink("/")

const animes = ref<Anime[]>([])

onMounted(async () => {
  animes.value = await $database.animes();
})
</script>

<style lang="scss">
@import "~/assets/css/basic.scss";

main.grid {

  .grid-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .grid {
      padding: 20px;
      padding-top: 10px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 20px;
      width: 100%;
      height: max-content;

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

          .play {
            scale: 2.5;
            opacity: 0;
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
            }
          }

          &:hover {
            scale: 1.01;

            .play {
              opacity: 1;
            }

            .cover {
              filter: brightness(40%);
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
    }
  }
}
</style>