<template>
  <main class="index">
    <NuxtLink to="/grid">
      Grid
    </NuxtLink>
  </main>
</template>

<script lang="ts" setup>
const titlebarStore = useTitlebarStore();
titlebarStore.setTitle("Home")
titlebarStore.setBackLink("")
</script>

<style lang="scss">
main.index {
  
}
</style>