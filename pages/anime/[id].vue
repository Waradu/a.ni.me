<template>
  <main class="anime">
    <header v-if="anime">
      <div class="banner">
        <div class="logo">
          LOGO
        </div>
      </div>
      <div class="info">
        <div class="image">
          <img :src="anime.image" alt="">
        </div>
        <div class="text">
          <h1>
            {{ anime.name }}
            <div class="airing">
              {{ anime.status }}
            </div>
          </h1>
          <div class="description">
            <p v-html="anime.synopsis"></p>
          </div>
        </div>
      </div>
    </header>
  </main>
</template>

<script lang="ts" setup>
import type { Anime } from '~/types/anime';

const route = useRoute();
const error = useError()
const { $database } = useNuxtApp();

const titlebarStore = useTitlebarStore();

const anime = ref<Anime>()

onMounted(async () => {
  const getanime = await $database.anime(Number(route.params.id));

  if (!getanime) {
    error({
      statusCode: 500,
      message: 'Custom error message'
    })

    return
  }

  titlebarStore.setTitle(getanime.name)
  anime.value = getanime;
})
</script>

<style lang="scss">
@import "~/assets/css/basic.scss";

main.anime {
  header {
    width: 100%;
    position: relative;

    .banner {
      background-color: #ffffff20;
      width: 100%;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 80%, transparent 100%);
      mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 80%, transparent 100%);
    }

    .info {
      display: flex;
      gap: 20px;
      position: absolute;
      top: 50%;
      width: 100%;
      padding-inline: 100px;

      .image {
        aspect-ratio: 2 / 3;
        height: 300px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0px 5px 10px #00000010;
        }
      }

      .text {
        margin-top: 100px;
        width: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        h1 {
          margin-left: 12px;
          display: flex;
          align-items: center;
          gap: 20px;

          .airing {
            font-size: 12px;
            padding: 8px;
            padding-inline: 14px;
            border-radius: 40px;
            line-height: 1;
            background-color: #4e6e4e;
          }
        }

        .description {
          padding: 10px;
          padding-inline: 12px;
          transition: .2s ease-in-out;
          border-radius: 8px;
          cursor: pointer;

          p {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            line-clamp: 5;
            -webkit-box-orient: vertical;
          }

          &:hover {
            background-color: #ffffff10;
          }
        }
      }
    }

  }
}
</style>