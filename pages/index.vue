<template>
  <main class="index">
    <div class="grid-container">
      <div class="grid">
        <Suspense>
          <template #default>
            <Animes />
          </template>
          <template #fallback>
            <h3>Loading...</h3>
          </template>
        </Suspense>
      </div>
    </div>
    <div class="footer" v-if="!searching">{{ titlebarStore.count }}/{{ count }} animes shown</div>
  </main>
</template>

<script lang="ts" setup>
const titlebarStore = useTitlebarStore();
titlebarStore.setTitle("Animes");
titlebarStore.setBackLink("");

const { $emitter, $database } = useNuxtApp();

const searching = ref(false);
const count = ref(0);

const keyboard = useKeyboard();

keyboard.up("Escape", async () => {
  searching.value = false;
  titlebarStore.setTitle("Animes");
});

onMounted(async () => {
  $emitter.off('search');

  $emitter.on('search', search);

  count.value = await $database.count();
});

const search = () => {
  if (titlebarStore.getSearch().length < 1) {
    titlebarStore.setTitle("Animes");
    searching.value = false;
    return;
  };

  searching.value = true;
  titlebarStore.setTitle("Searching");
};

onBeforeUnmount(() => {
  keyboard.stop();
});
</script>

<style lang="scss">
main.index {
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
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px;
      width: 100%;
      height: max-content;
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