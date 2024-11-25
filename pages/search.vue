<template>
  <main class="search">
    <div class="grid-container">
      <div class="grid">
        <TransitionGroup name="fade" v-if="!loading">
          <template v-for="anime in animes" :key="anime.id">
            <Anime :anime="anime" />
          </template>
        </TransitionGroup>
        <template v-for="i in 100" :key="i" v-else>
          <SkeletonAnime />
        </template>
      </div>
    </div>
    <div class="or" v-if="!loading && animes.length == 0">
      <span>Search by season</span>
      <Dropdown :items="seasonOptions" v-model="seasonSelected" />
      <Dropdown :items="seasonYearOptions" v-model="seasonYearSelected" />
      <button class="search">Search</button>
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

const { $api, $emitter } = useNuxtApp();

const keyboard = useKeyboard();

keyboard.up("Escape", () => {
  titlebarStore.setSearch("");
  animes.value = [];
});

const animes = ref<MinimalAnilistAnime[]>([]);

const loading = ref(false);

const seasonOption = ref<string>("");
const seasonYearOption = ref<number>(0);

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
    seasonYearOption.value = n as number;
  }
);

onMounted(() => {
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

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.fade-leave-active {
  transition: all 0.1s ease-in-out;
  opacity: 0;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  scale: 0.8;
}

.fade-leave-active {
  position: fixed;
}
</style>
