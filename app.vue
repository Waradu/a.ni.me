<template>
  <span class="text-red-500">Hello, World!</span>
</template>

<style lang="scss">
html,
body,
#__nuxt,
.page {
  width: 100%;
  height: 100%;
  background-color: #222222;
  font-family: "Segoe UI", sans-serif;
  color: white;
  overflow: hidden;
}

html:not(:has(.reduced)) {
  .page-enter-active {
    transition: all 0.3s ease-in-out;
  }

  .page-leave-active {
    transition: all 0.2s ease-in-out;
  }

  .page-enter-from {
    opacity: 0;
    translate: 0 50px;
  }

  .page-leave-to {
    opacity: 0;
  }
}
</style>