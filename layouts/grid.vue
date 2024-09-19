<template>
  <div class="page">
    <main class="grid">
      <div class="grid-container">
        <slot />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
main.grid {
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