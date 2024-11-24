<template>
  <div class="card">
    <NuxtLink class="image" @click.prevent="redirect(anime.id)">
      <OpenIcon class="open" />
      <div class="cover">
        <img :src="(settingsStore.imageProxy ? settingsStore.imageProxy : '') + anime.data.coverImage.url"
          onerror="this.onerror=null; this.src='/transparent.png'" alt="Cover">
      </div>
    </NuxtLink>
    <div class="text">
      <span class="title" :title="anime.data.title.english ?? anime.data.title.romaji ?? 'N/A'" v-tippy>{{
        anime.data.title.english ?? anime.data.title.romaji ?? 'N/A'
      }}</span>
      <p class="info capitalize" v-if="anime.data.seasonYear">
        {{ anime.data.season
          ? anime.data.season + " " + anime.data.seasonYear
          : anime.data.seasonYear }}
      </p>
      <p class="info" v-else>N/A</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import OpenIcon from "~/node_modules/@fluentui/svg-icons/icons/open_32_filled.svg";
import type { Anime } from "~/types/database";

const settingsStore = useSettingsStore();

const redirect = (id: number) => {
  navigateTo(`/anime/${id}`);
};

defineProps<{
  anime: Anime;
}>();
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
    user-select: none;

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
      font-size: 20px;
      line-height: 26px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;
    }

    p {
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      color: #ffffff80;

      &.capitalize {
        text-transform: capitalize;
      }
    }
  }
}
</style>