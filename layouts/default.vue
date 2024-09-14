<template>
  <div class="page">
    <Titlebar />
    <slot />
  </div>
</template>

<style lang="scss">
.page {
  display: flex;
  justify-content: center;
}

main {
  margin-top: 60px;
  height: calc(100% - 60px);
  overflow: auto;
  width: 100%;
  /* max-width: 1400px; */
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  margin-block: 5px;
}

::-webkit-scrollbar-thumb {
  background: #bebebe40;
  border: 4px solid transparent;
  border-radius: 10px;
  background-clip: padding-box;
}

::-webkit-scrollbar-thumb:hover {
  background: #bebebe60;
  border: 2px solid transparent;
  background-clip: padding-box;
}

::-webkit-scrollbar:hover {
  width: 10px;
}

h1 {
  @extend %title1;
}

h2 {
  @extend %title2;
}

h3 {
  @extend %title3;
}

.page-enter-active,
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
</style>