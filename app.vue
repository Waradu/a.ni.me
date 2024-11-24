<template>
  <Titlebar />
  <div class="page">
    <NuxtPage />
  </div>
  <Toaster />
</template>

<script lang="ts" setup>
import { check } from '@tauri-apps/plugin-updater';
import { open } from '@tauri-apps/plugin-shell';

const toaster = useToaster();
const titlebarStore = useTitlebarStore();

onMounted(async () => {
  if (!import.meta.dev) {
    try {
      const update = await check();
      if (update) {
        toaster.set(`A new version just released: ${update.version}. downloading now...`);
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

              toaster.set(`Downloaded ${downloadedMB} MB from ${contentLengthMB} MB`);

              break;
            case 'Finished':
              console.log('download finished');
              break;
          }
        });

        toaster.set(`Update finished downloading. Please click here to install.`, "green");
        toaster.click = async (e) => {
          await update.install();
          toaster.click = async (e) => true;
          return false;
        };
      }
    } catch (e) {
      toaster.set(`An error occured while downloading the update. Please click here to manually download`, "red");
      toaster.click = async (e) => {
        await open("https://github.com/Waradu/a.ni.me/releases");
        return true;
      };
      console.error(e);
    }
  }

  // @ts-expect-error window does not have nuxtapp as child
  window.na = useNuxtApp();
});
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

html {
  background-color: #222222;
}

body {
  background-color: #222222;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  transition: background-color 0.2s;
}

body::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  background-image: var(--bg-image);
}

body:has(main.anime)::before {
  opacity: 1;
}

.page {
  backdrop-filter: blur(6px);
  background-color: #222222dd;
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
  font-size: 32px;
  line-height: 40px;
  font-weight: 600;
}

h2 {
  font-size: 28px;
  line-height: 36px;
  font-weight: 600;
}

h3 {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
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