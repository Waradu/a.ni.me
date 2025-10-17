<template>
  <nav
    class="flex h-13 w-full cursor-default justify-between border-b border-neutral-700 p-2 select-none"
    data-tauri-drag-region
  >
    <template v-if="currentPlatform == 'macos'">
      <div class="w-52" />
      <TitlebarNavigation v-if="!(hideNavigation || hideNavbar)" />
    </template>
    <div
      class="flex w-52 items-center"
      :class="currentPlatform == 'macos' ? 'pr-2' : 'pl-2'"
      data-tauri-drag-region
    >
      <h3
        class="w-full overflow-hidden text-lg font-semibold overflow-ellipsis whitespace-nowrap"
        :class="currentPlatform == 'macos' ? 'text-end' : ''"
        data-tauri-drag-region
      >
        {{ title }}
      </h3>
    </div>
    <template v-if="currentPlatform != 'macos'">
      <TitlebarNavigation v-if="!(hideNavigation || hideNavbar)" />
      <TitlebarControls />
    </template>
  </nav>
</template>

<script lang="ts" setup>
import { platform } from "@tauri-apps/plugin-os";

const title = usePageScopedState("title");
const hideNavbar = usePageScopedState("hideNavbar");

const currentPlatform = await platform();

defineProps<{
  hideNavigation?: boolean;
}>();
</script>
