<template>
  <div
    :class="[
      'h-8 max-h-8 w-full pb-[1px] flex items-center px-2.5 text-xs text-neutral-400 border-t-[1px] border-neutral-700 justify-between relative',
      'after:block after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:transition-[width] after:duration-100 after:ease-in-out after:w-[var(--progress)] after:h-[2px] after:bg-green-500',
    ]"
    :style="{ '--progress': progress + '%' }"
  >
    <div class="w-48 flex">
      {{ appData }}
    </div>
    <div>Downloading update () - {{ progress }}%</div>
    <div class="w-48 flex justify-end" @click="progress = 0">12 / 64</div>
  </div>
</template>

<script lang="ts" setup>
import { useVersion } from "~/composables/useVersion";

const progress = ref(0);

const { name, version, tauriVersion, identifier } = useVersion();
const appData = computed(
  () => `${name.value}-${version.value} with tauri-${tauriVersion.value}`
);
</script>
