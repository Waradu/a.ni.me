<template>
  <Titlebar />
  <div class="page">
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/perspective.css';

onMounted(() => {
  tippy(".infoTooltip", {
    animation: "perspective",
    content: (reference) => reference.getAttribute('title') ?? "",
    interactive: true
  })
})
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  letter-spacing: 0.1px;
}

html,
body,
#__nuxt,
.page {
  width: 100%;
  height: 100%;
  background-color: transparent;
  font-family: 'Segoe UI', sans-serif;
  color: white;
  overflow: hidden;
}

.page {
  display: flex;
  justify-content: center;
}

main {
  overflow: auto;
  width: 100%;
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

a {
  color: inherit;
  text-decoration: unset;

  &.underline {
    text-decoration: underline;
  }
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