<template>
  <div class="page bg-neutral-800 bg-opacity-85 backdrop-blur-md">
    <Titlebar />
    <main class="w-[calc(100%-4px)] h-full overflow-hidden overflow-y-scroll">
      <NuxtPage />
    </main>
    <Statusbar />
  </div>
</template>

<script lang="ts" setup>
import { onOpenUrl } from "@tauri-apps/plugin-deep-link";

await onOpenUrl((urls) => {
  console.log("deep link:", urls);
});
</script>

<style lang="scss">
@use "~/assets/tippy";

* {
  letter-spacing: 0.1px;
}

html,
body,
#__nuxt {
  width: 100%;
  height: 100%;
  font-family: "Segoe UI", sans-serif;
  color: white;
  overflow: hidden;
}

.page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
  background-image: url("https://s4.anilist.co/file/anilistcdn/media/anime/banner/131565-JBlm0IItFlUV.jpg");
}

body:has(main.anime)::before {
  opacity: 1;
}

::-webkit-scrollbar {
  width: 0.4rem;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

html:not(:has(.reduced)) {
  --speed: 0.1s;
  --impact: 20px;

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all var(--speed) ease-in-out;
  }
  .slide-left-enter-from,
  .slide-right-leave-to {
    opacity: 0;
    filter: blur(2px);
    transform: translateX(var(--impact));
  }
  .slide-left-leave-to,
  .slide-right-enter-from {
    opacity: 0;
    filter: blur(2px);
    transform: translateX(calc(var(--impact) * -1));
  }

  .page-enter-active,
  .page-leave-active {
    transition: all var(--speed) ease-in-out;
  }

  .page-enter-from {
    opacity: 0;
    filter: blur(2px);
    transform: translateY(var(--impact));
  }

  .page-leave-to {
    opacity: 0;
    filter: blur(2px);
  }
}
</style>
