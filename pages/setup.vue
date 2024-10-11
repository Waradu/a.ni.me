<template>
  <main class="setup">
    <NuxtPage />
  </main>
</template>

<script lang="ts" setup>
const titlebarStore = useTitlebarStore();
titlebarStore.setTitle("Setup")
</script>

<style lang="scss">
main.setup {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  >div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 40px;
  }

  .navigation {
    display: flex;
    gap: 10px;
    align-items: center;

    .step {
      padding-inline: 10px;
      color: lightgray;
    }

    button {
      display: flex;
      gap: 20px;
      border: none;
      border-radius: 100px;
      padding-inline: 16px;
      background-color: #4a794a80;
      color: white;
      align-items: center;
      font-size: 16px;
      cursor: pointer;
      height: 36px;
      min-width: 36px;
      padding-top: 2px;
      transition: .2s ease-in-out;

      &:hover {
        background-color: #4a794a;
      }

      &.back {
        padding-inline: 0;
        justify-content: center;
        background-color: #75757540;

        &:hover {
          background-color: #757575aa;
        }
      }
    }
  }
}
</style>