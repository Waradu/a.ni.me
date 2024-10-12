<template>
  <main class="index">
    TEST#2
    <div class="grid-container">
      <div class="grid">
        <AnimesSearch v-if="searching" />
        <AnimesSaved v-else />
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
const titlebarStore = useTitlebarStore();
titlebarStore.setTitle("Animes")
titlebarStore.setBackLink("")

const { $emitter } = useNuxtApp();

const searching = ref(false)

const keyboard = useKeyboard()

keyboard.up("Escape", async () => {
  searching.value = false;
  titlebarStore.setTitle("Animes")
})

onMounted(() => {
  $emitter.off('search');
  $emitter.off('stopSearch');

  $emitter.on('search', search)
})

const search = () => {
  if (titlebarStore.getSearch().length < 1) {
    titlebarStore.setTitle("Animes")
    searching.value = false;
    return;
  };

  searching.value = true
  titlebarStore.setTitle("Searching")
}

onBeforeUnmount(() => {
  keyboard.stop()
})
</script>

<style lang="scss">
main.index {
  .grid-container {
    width: 100%;
    display: flex;
    justify-content: center;

    .grid {
      padding: 12px;
      padding-top: 0px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px;
      width: 100%;
      height: max-content;
    }
  }
}
</style>