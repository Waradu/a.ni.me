<template>
  <div class="select">
    <h1>Some recommendations (Click to add) (Optional)</h1>
    <div class="animes">
      <label class="anime" v-for="anime in animes" :key="anime.mal_id" :for="anime.mal_id.toString()">
        <div class="cover">
          <img :src="(settingsStore.malImageProxy ? settingsStore.malImageProxy : '') + anime.image"
            onerror="this.onerror=null; this.src='/transparent.png'" alt="Cover">
        </div>
        <span class="title" :title="anime.title ?? anime.title">{{ anime.title ?? anime.title }}</span>
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

const setupStore = useSetupStore();

if (setupStore.finished) {
  navigateTo("/setup/finish");
}

const settingsStore = useSettingsStore();

const animes = ref([
  {
    mal_id: 52034,
    image: "https://cdn.myanimelist.net/images/anime/1812/134736.jpg",
    title: "[Oshi No Ko]",
  },
  {
    mal_id: 16498,
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    title: "Attack on Titan",
  },
  {
    mal_id: 52991,
    image: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
    title: "Frieren: Beyond Journey's End",
  },
  {
    mal_id: 9253,
    image: "https://cdn.myanimelist.net/images/anime/1935/127974.jpg",
    title: "Steins;Gate",
  }
]);
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
        font-size: 16px;
        line-height: 22px;
        font-weight: 600;
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