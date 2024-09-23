<template>
  <div class="card" v-if="anime">
    <NuxtLink class="image" @click="onClick()" :to="link">
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
  <div class="card" v-else>
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
import PlayIcon from "~/node_modules/@fluentui/svg-icons/icons/open_32_filled.svg";
import AddIcon from "~/node_modules/@fluentui/svg-icons/icons/add_32_filled.svg";

defineProps({
  anime: {
    type: Object as PropType<Anime | false>,
    required: true
  },
  link: {
    type: String,
    default: ""
  },
  onClick: {
    type: Function,
    default() {
      return () => { }
    },
  }
})

const titlebarStore = useTitlebarStore();
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

    .play {
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

      .play {
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