<template>
  <Titlebar />
  <div class="page">
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import tippy, { roundArrow } from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/perspective.css';
import 'tippy.js/dist/svg-arrow.css';
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';
import type { Id } from 'vue3-toastify';

const { $cache, $toast } = useNuxtApp();

try {
  const update = await check();
  if (update) {
    const toastId = ref<Id>('');
    toastId.value = $toast(`A new version just released: ${update.version}. downloading now...`, {
      closeOnClick: false,
      autoClose: false
    })
    let downloaded = 0;
    let contentLength = 0;

    await update.downloadAndInstall((event) => {
      switch (event.event) {
        case 'Started':
          contentLength = event.data.contentLength || -1;
          console.log(`started downloading ${event.data.contentLength} bytes`);
          break;
        case 'Progress':
          downloaded += event.data.chunkLength;
          console.log(`downloaded ${downloaded} from ${contentLength}`);

          $toast.update(toastId.value, {
            content: `downloaded ${downloaded} from ${contentLength}`
          })

          break;
        case 'Finished':
          console.log('download finished');
          break;
      }
    });

    console.log('update installed');

    $toast.update(toastId.value, {
      content: `Update finished downloading. Please click here to restart or do it manually.`,
      onClick: async () => {
        await relaunch();
      }
    })
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