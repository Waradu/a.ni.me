<template>
  <Titlebar />
  <div class="page">
    <NuxtPage />
  </div>
  <Toasts />
</template>

<script lang="ts" setup>
import tippy, { roundArrow } from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/perspective.css';
import 'tippy.js/dist/svg-arrow.css';
import { check } from '@tauri-apps/plugin-updater';

const { $cache } = useNuxtApp();

const toaster = useToaster()

try {
  const update = await check();
  if (update) {
    toaster.set(`A new version just released: ${update.version}. downloading now...`)
    let downloaded = 0;
    let contentLength = 0;

    await update.download((event) => {
      switch (event.event) {
        case 'Started':
          contentLength = event.data.contentLength || -1;
          console.log(`started downloading ${event.data.contentLength} bytes`);
          break;
        case 'Progress':
          downloaded += event.data.chunkLength;
          const downloadedMB = (downloaded / (1024 * 1024)).toFixed(2);
          const contentLengthMB = (contentLength / (1024 * 1024)).toFixed(2);

          toaster.set(`Downloaded ${downloadedMB} MB from ${contentLengthMB} MB`)

          break;
        case 'Finished':
          console.log('download finished');
          break;
      }
    });

    toaster.set(`Update finished downloading. Please click here to install.`)
    toaster.click = async (e) => {
      await update.install()
      toaster.click = async (e) => true
      return false;
    }
  }
} catch (e) {
  console.error(e);
}

tippy.setDefaultProps({
  animation: "perspective",
  content: (reference) => reference.getAttribute('title') ?? "",
  interactive: true,
  maxWidth: 250,
  arrow: roundArrow
})

onMounted(() => {
  (window as any)._get = $cache.get
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

.page-enter-active {
  transition: all .3s ease-in-out;
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
</style>