<template>
  <main class="search">
    <div class="grid-container">
      <div class="grid">
        <Suspense>
          <template #default>
            <AnimeSearch />
          </template>
          <template #fallback>
            <template v-for="i in 100" :key="i">
              <SkeletonAnime />
            </template>
          </template>
        </Suspense>
      </div>
    </div>
    <div class="footer">
      Start typing in the titlebar and press enter to search
    </div>
  </main>
</template>

<script lang="ts" setup>
const titlebarStore = useTitlebarStore();
titlebarStore.setTitle("Search");

const { $emitter } = useNuxtApp();
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
