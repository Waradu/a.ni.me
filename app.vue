<template>
  <div class="relative w-full h-full">
    <NuxtImg
      :src="bgImageSrc"
      class="absolute w-full h-full object-cover transition-all"
      :class="bgImage ? 'opacity-100' : 'opacity-0'"
      v-if="false"
    />
    <div
      class="bg-neutral-800 bg-opacity-95 backdrop-blur-sm w-full h-full flex flex-col transition-all"
    >
      <Titlebar />
      <main class="w-[calc(100%-4px)] h-full overflow-hidden overflow-y-scroll">
        <NuxtPage />
      </main>
      <Statusbar />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onOpenUrl } from "@tauri-apps/plugin-deep-link";
import { error } from "@tauri-apps/plugin-log";
import { platform } from "@tauri-apps/plugin-os";
import useShared from "@waradu/useshared";

const { auth, refreshUser } = useAuth();

const bgImage = usePageScopedState("bgImage");
const { data: bgImageSrc } = useShared({
  key: "bgImage",
  data: "",
});

await onOpenUrl((urls) => {
  const callback = urls.find((url) => url.startsWith("a.ni.me://callback"));

  if (!callback) {
    error(`Callback url not found '${urls.join(", ")}'`);
    return;
  }

  const url = new URL(callback);

  const token = url.hash.replace("#", "");

  if (!token || token == "") {
    error(`Token not found '${callback}'`);
    return;
  }

  if (auth.value) {
    auth.value.token = token;
    refreshUser();
  }
});

refreshUser();

onMounted(() => {
  if (import.meta.dev) {
    // @ts-expect-error window does not have nuxtapp as child
    window.nuxtapp = useNuxtApp();
  }

  const detectPlatform = async () => {
    const currentPlatform = await platform();

    document.documentElement.classList.add(currentPlatform);
  };

  detectPlatform();
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

html:not(.windows):not(.maximized) {
  &, body, #__nuxt {
    border-radius: 8px;
  }

  body {
    border: 1px solid rgb(64, 64, 64);
  }
}

::-webkit-scrollbar {
  width: 0.4rem;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  margin-top: 4px;
  margin-bottom: 4px;
}

::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

html:not(:has(.reduced)) {
  --speed: 0.15s;
  --impact: 20px;

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active,
  .page-enter-active,
  .page-leave-active {
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

  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(2px);
  }
}
</style>
