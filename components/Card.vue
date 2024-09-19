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
    type: Object as PropType<Anime | null>,
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

<style lang="scss"></style>