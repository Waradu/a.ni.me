<template>
  <main class="index">
    <div class="grid-container">
      <div class="grid">
        <div class="card" v-for="i in 20">
          <div class="image">
            <Playcon class="play" />
            <div class="cover">
              <img src="" alt="not found">
            </div>
          </div>
          <div class="text">
            <h3 class="title">Test Title {{ i }}</h3>
            <p class="info">info</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import type { Anime } from '~/types/anime';
import Playcon from "~/node_modules/@fluentui/svg-icons/icons/play_32_filled.svg";

const { $database } = useNuxtApp();

const animes = ref<Anime[]>([])

onMounted(async () => {
  animes.value = await $database.animes();
})
</script>

<style lang="scss">
@import "~/assets/css/basic.scss";

main.index {
  width: 100%;
  height: 100%;

  .grid-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .grid {
      padding: 20px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 20px;
      width: 100%;
      height: 100%;
      padding-top: 10px;

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

          .play {
            scale: 2;
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
              filter: brightness(60%);
            }
          }
        }

        .text {
          display: flex;
          flex-direction: column;

          h3 {
            @extend %title3;
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