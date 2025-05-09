<template>
  <div
    :class="[
      'h-8 max-h-8 min-h-8 w-full flex items-center p-1 text-xs text-neutral-400 border-t-[1px] border-neutral-700 justify-between relative select-none',
      downloading
        ? 'after:block after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:transition-[width] after:duration-100 after:w-[var(--progress)] after:h-[2px] after:bg-green-500'
        : '',
    ]"
    :style="{ '--progress': progress * 100 + '%' }"
    data-tauri-drag-region
  >
    <div class="max-w-0 flex h-full" data-tauri-drag-region>
      <StatusbarButton @click="check" title="Check for updates" v-tippy>
        {{ appData }}
      </StatusbarButton>
    </div>
    <StatusbarButton v-if="error" @click="check" error>
      Update failed. Click here to try again.
    </StatusbarButton>
    <StatusbarButton disabled v-else-if="pending">
      Checking for updates
    </StatusbarButton>
    <StatusbarButton disabled v-else-if="downloading">
      Downloading v{{ latestVersion }} - {{ Math.round(progress * 100) }}%
    </StatusbarButton>
    <StatusbarButton
      v-else-if="progress >= 0.99 && !downloading && updateAvailable"
      @click="install"
    >
      Click to install update (restart the app)
    </StatusbarButton>
    <div class="max-w-0 flex justify-end h-full" data-tauri-drag-region>
      <StatusbarButton disabled> Showing 12 / 64 </StatusbarButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { name, version, tauriVersion } = useVersion();
const {
  updateAvailable,
  latestVersion,
  progress,
  error,
  pending,
  downloading,
  check,
  install,
} = useUpdater();

const appData = computed(
  () =>
    `v${version.value} with tauri v${tauriVersion.value} ${
      import.meta.dev ? "- dev" : ""
    }`
);
</script>
