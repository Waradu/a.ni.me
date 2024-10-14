<template>
  <div class="select">
    <h1>Some recommendations (Click to add) (Optional)</h1>
    <div class="animes">
      <label class="anime" v-for="anime in animes" :key="anime.mal_id" :for="anime.mal_id.toString()">
        <div class="cover">
          <img
            :src="(settingsStore.malImageProxy ? settingsStore.malImageProxy : '') + (anime.images.jpg.large_image_url || anime.images.jpg.image_url)"
            onerror="this.onerror=null; this.src='/transparent.png'" alt="Cover">
        </div>
        <span class="title" :title="anime.title_english || anime.title">{{ anime.title_english || anime.title }}</span>
        <input type="checkbox" :id="anime.mal_id.toString()" :name="anime.mal_id.toString()" :value="anime.mal_id"
          v-model="setupStore.selectedAnimes" />
      </label>
    </div>
    <div class="navigation">
      <NuxtLink to="/setup/config">
        <button class="back">
          <ArrowLeftIcon />
        </button>
      </NuxtLink>
      <div class="step">
        2 / 2
      </div>
      <NuxtLink to="/setup/finish">
        <button>Finish
          <ArrowRightIcon />
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ArrowLeftIcon from "@fluentui/svg-icons/icons/arrow_left_32_filled.svg";
import ArrowRightIcon from "@fluentui/svg-icons/icons/arrow_right_32_filled.svg";
import { AnimeClient, type Anime } from "@tutkli/jikan-ts";

const setupStore = useSetupStore();

if (setupStore.finished) {
  navigateTo("/setup/finish")
}

var animeClient = new AnimeClient();

const settingsStore = useSettingsStore();

if (settingsStore.jikanBaseUrl != "") {
  animeClient = new AnimeClient({
    baseURL: settingsStore.jikanBaseUrl,
  });
}

const animeIds = [52034, 16498, 52991, 9253]
const animes = ref<Anime[]>([]);

try {
  animeIds.forEach(async id => {
    const response = await animeClient.getAnimeById(id);
    animes.value.push(response.data);
  })
} catch (error) {
  console.error("Failed to fetch anime list", error);
}
</script>

<style lang="scss">
.select {
  .animes {
    display: flex;
    gap: 20px;

    .anime {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 180px;
      text-align: center;

      .cover {
        background-color: #ffffff10;
        aspect-ratio: 2 / 3;
        transition: .2s ease-in-out;
        display: flex;
        border-radius: 8px;
        overflow: hidden;
        width: 100%;
        border: 3px solid #65a36500;

        img {
          width: 100%;
          height: 100%;
          transition: .2s ease-in-out;
          object-fit: cover;
        }

        &:has(.img) {
          background-color: #ff868610;
        }
      }

      span {
        @extend %subtitle2;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        text-overflow: ellipsis;
        transition: .2s ease-in-out;
      }

      input {
        display: none;
      }

      &:has(:checked) {
        .cover {
          border-color: #65a365;
        }

        span {
          color: #8dca8d;
        }
      }
    }
  }
}
</style>