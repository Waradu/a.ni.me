<template>
  <TransitionGroup name="fade">
    <template v-for="anime in filteredAnimes" :key="anime.id">
      <Anime :anime="anime" />
    </template>
  </TransitionGroup>
</template>

<script lang="ts" setup>
import type { Anime } from "~/types/database";

const { $animes } = useNuxtApp();

const titlebarStore = useTitlebarStore();
const settingsStore = useSettingsStore();

const filteredAnimes = computed(() => {
  const term = titlebarStore.search.toLowerCase();

  var res = animes.value.filter((a) => {
    const title = a.data.title.english || a.data.title.romaji;
    const description = a.data.description;

    a.data.characters.nodes.forEach(c => {
      const name = c.name.full;
      if (!name) return;
      name.toLowerCase().includes(term);
      return true;
    });

    return (
      (title && title.toLowerCase().includes(term)) ||
      (description && description.toLowerCase().includes(term))
    );
  }).sort(
    (a, b) => {
      const sortBy = settingsStore.sortBy;

      if (sortBy == "stars") {
        if (a.stars > b.stars) {
          return -1;
        }

        if (a.stars < b.stars) {
          return 1;
        }

        return 0;
      };

      if (sortBy == "date_added") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      };

      var aItem;
      var bItem;

      if (sortBy == "name") {
        aItem = a.data.title.english || a.data.title.romaji || "";
        bItem = b.data.title.english || b.data.title.romaji || "";

        return aItem.localeCompare(bItem);
      } else {
        aItem = a.data[sortBy as keyof typeof a.data];
        bItem = b.data[sortBy as keyof typeof b.data];
      }

      if (!aItem || !bItem) return 0;

      if (aItem > bItem) {
        return -1;
      }

      if (aItem < bItem) {
        return 1;
      }

      return 0;
    }
  );

  if (settingsStore.order == "desc") {
    res = res.reverse();
  }

  if (!settingsStore.filters.showHidden) {
    res = res.filter(a => !a.is_hidden);
  }

  if (settingsStore.filters.watched != null) {
    res = res.filter(a => a.watched == settingsStore.filters.watched);
  }

  if (settingsStore.filters.stars.value != null) {
    const val = settingsStore.filters.stars.value;
    const type = settingsStore.filters.stars.type;

    res = res.filter(a => {
      if (type == "e") {
        return a.stars == val;
      }

      if (type == "ne") {
        return a.stars != val;
      }

      if (type == "gt") {
        return a.stars > val;
      }

      if (type == "st") {
        return a.stars < val;
      }

      return true;
    });
  }

  titlebarStore.count = res.length;

  return res;
});

const animes = ref<Anime[]>([]);

animes.value = await $animes.animes();
</script>

<style lang="scss">
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
  scale: .8;
}

.fade-leave-active {
  position: fixed;
}
</style>