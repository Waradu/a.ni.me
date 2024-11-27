<template>
  <main class="search">
    <div class="grid-container">
      <div class="grid">
        <template v-for="anime in animes" :key="anime.id" v-if="!loading">
          <Anime :anime="anime" :inLib="dbAnimes.includes(anime.id)" />
        </template>
        <template v-for="i in 100" :key="i" v-else>
          <SkeletonAnime />
        </template>
      </div>
    </div>
    <div class="or" v-if="!loading && animes.length == 0">
      <span>Or search by Season</span>
      <div class="group">
        <Dropdown :items="seasonOptions" v-model="seasonSelected" />
        <Dropdown :items="seasonYearOptions" v-model="seasonYearSelected" />
        <button class="search" @click="searchBySeason">Search</button>
      </div>
    </div>
    <div class="footer">
      Start typing in the titlebar and press enter to search
    </div>
  </main>
</template>

<script lang="ts" setup>
import type { MinimalAnilistAnime } from "~/types/anilist";
import type { Item } from "~/types/dropdown";

const titlebarStore = useTitlebarStore();
titlebarStore.setTitle("Search");

const { $api, $emitter, $database } = useNuxtApp();

const keyboard = useKeyboard();

keyboard.up("Escape", () => {
  const ele = document.querySelector(".modal.shown");

  if (ele) return;

  titlebarStore.setSearch("");
  animes.value = [];
});

const searchBySeason = async () => {
  const season = seasonSelected.value.value as string;
  const seasonYear = seasonYearSelected.value.value as string;

  if (season == "" && seasonYear == "") return;

  loading.value = true;

  animes.value = await $api.search("", season, seasonYear);

  loading.value = false;
};

const animes = ref<MinimalAnilistAnime[]>([]);
const dbAnimes = ref<number[]>([]);

const loading = ref(false);

const seasonOption = ref<string>("");
const seasonYearOption = ref<string>("");

const seasonOptions: Item[] = [
  { name: "All", value: "" },
  { name: "Summer", value: "SUMMER" },
  { name: "Fall", value: "FALL" },
  { name: "Winter", value: "WINTER" },
  { name: "Spring", value: "SPRING" },
];

const startYear = 1980;
const currentYear = new Date().getFullYear() + 4;

const seasonYearOptions: Item[] = [{ name: "All", value: "" }];

for (let year = currentYear; year >= startYear; year--) {
  seasonYearOptions.push({ name: `${year}`, value: `${year}` });
}

const { selected: seasonSelected } = useDropdown(
  seasonOptions,
  seasonOption.value,
  (n) => {
    seasonOption.value = n as string;
  }
);

const { selected: seasonYearSelected } = useDropdown(
  seasonYearOptions,
  seasonYearOption.value,
  (n) => {
    seasonYearOption.value = n as string;
  }
);

onMounted(async () => {
  $emitter.off("search");
  $emitter.on("search", async () => {
    loading.value = true;

    const term = titlebarStore.getSearch();

    if (term == "") {
      loading.value = false;
      animes.value = [];
      return;
    }

    animes.value = await $api.search(term);

    loading.value = false;
  });

  dbAnimes.value = (await $database.animes()).map((a) => a.id);
});
</script>

<style lang="scss">
main.search {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .grid-container {
    width: 100%;
    display: flex;
    justify-content: center;

    .grid {
      padding: 12px;
      padding-top: 0px;
      padding-right: 8px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 12px;
      width: 100%;
      height: max-content;
    }
  }

  .or {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;

    .group {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .search {
      border-radius: 4px;
      border: 1px solid #4a794a80;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-inline: 10px;
      cursor: pointer;
      color: #ffffffaa;
      transition: 0.2s ease-in-out;
      background-color: #4a794a40;
      height: 34px;
      width: 100px;

      &:hover {
        background-color: #4a794add;
      }
    }
  }

  .footer {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 24px;
    padding-bottom: 12px;
    color: #ffffffaa;
  }
}
</style>
