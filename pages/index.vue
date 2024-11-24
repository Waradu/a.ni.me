<template>
  <main class="index">
    <div class="grid-container">
      <div class="grid">
        <Suspense>
          <template #default>
            <Animes />
          </template>
          <template #fallback>
            <template v-for="i in 100" :key="i">
              <SkeletonAnime />
            </template>
          </template>
        </Suspense>
      </div>
    </div>
    <div class="footer">{{ titlebarStore.count }}/{{ count }} animes shown</div>
  </main>
</template>

<script lang="ts" setup>
const titlebarStore = useTitlebarStore();
titlebarStore.setTitle("Animes");

const { $database } = useNuxtApp();

const count = ref(0);

onMounted(async () => {
  count.value = await $database.count();
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
      padding-right: 12px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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