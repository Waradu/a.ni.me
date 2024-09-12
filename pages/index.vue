<template>
  <main class="index">
    <input type="text" placeholder="Search or Add" @keyup.enter="navigateTo('/grid')">
  </main>
</template>

<script lang="ts" setup>
const titlebarStore = useTitlebarStore();
titlebarStore.setTitle("Home")
titlebarStore.setBackLink("")
</script>

<style lang="scss">
main.index {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-top: -60px;

  input {
    padding: 20px;
    width: 50vw;
    outline: none;
    border: 1px solid #ffffff10;
    border-radius: 8px;
    font-size: 24px;
    background-color: #00000040;
    color: white;
    box-shadow: 0 10px 300px -10px black;
  }
}
</style>