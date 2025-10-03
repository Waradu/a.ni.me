<template>
  <div
    class="flex h-full w-full flex-col backdrop-blur-sm transition-all"
  >
    <Titlebar />
    <main class="h-full w-[calc(100%-4px)] overflow-hidden overflow-y-scroll">
      <NuxtPage />
    </main>
    <Statusbar />
  </div>
</template>

<script lang="ts" setup>
import { platform } from "@tauri-apps/plugin-os";
import { onOpenUrl } from "@tauri-apps/plugin-deep-link";
import { error } from "@tauri-apps/plugin-log";

const auth = useAuthStore();

await onOpenUrl((urls) => {
  const callback = urls.find((url) => url.startsWith("a.ni.me://callback"));

  if (!callback) {
    error(`Callback url not found '${urls.join(", ")}'`);
    return;
  }

  const url = new URL(callback);

  const token = url.hash.replace("#", "");

  if (!token || token == "") {
    error(`Token not found: '${callback}'`);
    return;
  }

  auth.token = token;
  auth.refreshUser();
});

auth.refreshUser();

onMounted(() => {
  const detectPlatform = async () => {
    const currentPlatform = await platform();

    document.documentElement.classList.add(currentPlatform);
  };

  detectPlatform();
});
</script>
