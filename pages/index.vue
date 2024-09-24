<template>
  <main class="index">
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

$emitter.on('search', async () => {
  if (titlebarStore.getSearch().length < 1) {
    titlebarStore.setTitle("Animes")
    searching.value = false;
    return;
  };

  searching.value = true
  titlebarStore.setTitle("Searching")
})

$emitter.on('stopSearch', async () => {
  searching.value = false
  titlebarStore.setTitle("Animes")
})

const keyboard = useKeyboard()

keyboard.up("Escape", async () => {
  searching.value = false;
  titlebarStore.setTitle("Animes")
})

onBeforeUnmount(() => {
  keyboard.stop()
})
</script>

<style lang="scss">
main.index {
  .grid-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .grid {
      padding: 30px;
      padding-top: 10px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 20px;
      width: 100%;
      height: max-content;
    }
  }
}
</style>